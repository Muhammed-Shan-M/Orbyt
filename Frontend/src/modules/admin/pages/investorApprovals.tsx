import { useState } from 'react';
import { DUMMY_APPROVAL_REQUESTS } from '../api/admin.dummy';
import type { InvestorApprovalRequest, InvestorDocument } from '../types/admin.types';

// ─── Status badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: InvestorApprovalRequest['status'] }) => {
  const map = {
    pending: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', label: 'Pending' },
    under_review: { color: '#64a0ff', bg: 'rgba(100,160,255,0.1)', label: 'Under Review' },
    approved: { color: '#00D97E', bg: 'rgba(0,217,126,0.1)', label: 'Approved' },
    rejected: { color: '#ff6b6b', bg: 'rgba(255,107,107,0.1)', label: 'Rejected' },
  };
  const { color, bg, label } = map[status];
  return (
    <span style={{ background: bg, color, fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '100px' }}>
      {label}
    </span>
  );
};

// ─── Type badge ───────────────────────────────────────────────────────────────
const TypeBadge = ({ type }: { type: InvestorApprovalRequest['investorType'] }) => {
  const map = {
    angel: 'Angel', institutional: 'Institutional', vc: 'VC Fund', corporate: 'Corporate',
  };
  return (
    <span style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '100px' }}>
      {map[type]}
    </span>
  );
};

// ─── Document row ─────────────────────────────────────────────────────────────
const DocRow = ({ doc }: { doc: InvestorDocument }) => {
  const typeLabels: Record<InvestorDocument['type'], string> = {
    government_id: 'Government ID',
    accreditation_letter: 'Accreditation Letter',
    bank_statement: 'Bank Statement',
    firm_registration: 'Firm Registration',
    other: 'Other',
  };

  return (
    <div style={docStyles.row}>
      <div style={docStyles.icon}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00D97E" strokeWidth="2">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </div>
      <div style={{ flex: 1 }}>
        <div style={docStyles.name}>{typeLabels[doc.type]}</div>
        <div style={docStyles.date}>Uploaded {doc.uploadedAt}</div>
      </div>
      <a
        href={doc.url}
        style={docStyles.viewLink}
        onMouseEnter={(e) => { e.currentTarget.style.color = '#00D97E'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
      >
        View
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '4px' }}>
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </div>
  );
};

const docStyles: Record<string, React.CSSProperties> = {
  row: {
    display: 'flex', alignItems: 'center', gap: '12px',
    padding: '12px 16px', background: 'rgba(255,255,255,0.03)',
    borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)',
  },
  icon: {
    width: '32px', height: '32px', background: 'rgba(0,217,126,0.08)',
    borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  name: { fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.75)' },
  date: { fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' },
  viewLink: {
    display: 'flex', alignItems: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.4)',
    textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s',
  },
};

// ─── Detail Modal ─────────────────────────────────────────────────────────────
const RequestDetailModal = ({
  request,
  onClose,
  onApprove,
  onReject,
}: {
  request: InvestorApprovalRequest;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) => {
  const isPending = request.status === 'pending' || request.status === 'under_review';

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.panel} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={modalStyles.header}>
          <div>
            <div style={modalStyles.headerTitle}>Investor Application</div>
            <div style={modalStyles.headerSub}>Review all details before making a decision</div>
          </div>
          <button onClick={onClose} style={modalStyles.closeBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div style={modalStyles.body}>
          {/* Profile */}
          <div style={modalStyles.profileRow}>
            {request.avatarUrl ? (
              <img src={request.avatarUrl} alt={request.fullName} style={modalStyles.avatar} />
            ) : (
              <div style={modalStyles.avatarFallback}>
                {request.fullName.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div style={{ flex: 1 }}>
              <div style={modalStyles.name}>{request.fullName}</div>
              <div style={modalStyles.email}>{request.email}</div>
              {request.firmName && <div style={modalStyles.firm}>{request.firmName}</div>}
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                <StatusBadge status={request.status} />
                <TypeBadge type={request.investorType} />
              </div>
            </div>
          </div>

          <div style={modalStyles.divider} />

          {/* Info grid */}
          <SectionTitle>Contact & Profile</SectionTitle>
          <div style={modalStyles.infoGrid}>
            <InfoItem label="Email" value={request.email} />
            {request.website && (
              <InfoItem label="Website" value={
                <a href={request.website} style={{ color: '#00D97E', textDecoration: 'none' }}>{request.website}</a>
              } />
            )}
            {request.linkedIn && (
              <InfoItem label="LinkedIn" value={
                <a href={request.linkedIn} style={{ color: '#00D97E', textDecoration: 'none' }}>View Profile</a>
              } />
            )}
            {request.aum && <InfoItem label="AUM / Net Worth" value={request.aum} />}
            <InfoItem label="Submitted" value={request.submittedAt} />
          </div>

          {request.investmentThesis && (
            <>
              <div style={modalStyles.divider} />
              <SectionTitle>Investment Thesis</SectionTitle>
              <p style={modalStyles.thesis}>{request.investmentThesis}</p>
            </>
          )}

          {request.portfolioCompanies && request.portfolioCompanies.length > 0 && (
            <>
              <div style={modalStyles.divider} />
              <SectionTitle>Portfolio Companies</SectionTitle>
              <div style={modalStyles.pills}>
                {request.portfolioCompanies.map((c) => (
                  <span key={c} style={modalStyles.pill}>{c}</span>
                ))}
              </div>
            </>
          )}

          <div style={modalStyles.divider} />

          {/* Documents */}
          <SectionTitle>Submitted Documents ({request.documents.length})</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {request.documents.map((doc) => <DocRow key={doc.id} doc={doc} />)}
          </div>
        </div>

        {/* Actions */}
        {isPending && (
          <div style={modalStyles.footer}>
            <button
              onClick={() => onReject(request.id)}
              style={modalStyles.rejectBtn}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,107,107,0.15)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,107,107,0.08)'; }}
            >
              Reject Application
            </button>
            <button
              onClick={() => onApprove(request.id)}
              style={modalStyles.approveBtn}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#00f090'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#00D97E'; }}
            >
              Approve Investor
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: 'rgba(255,255,255,0.3)', marginBottom: '12px' }}>
    {children}
  </div>
);

const InfoItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.5px', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>{label}</div>
    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{value}</div>
  </div>
);

const modalStyles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    backdropFilter: 'blur(6px)', padding: '20px',
  },
  panel: {
    width: '100%', maxWidth: '600px', background: '#141414',
    border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px',
    display: 'flex', flexDirection: 'column', maxHeight: '88vh',
    overflow: 'hidden',
  },
  header: {
    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
    padding: '24px 28px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  headerTitle: { fontSize: '17px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.3px' },
  headerSub: { fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '4px' },
  closeBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexShrink: 0 },
  body: { overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' },
  profileRow: { display: 'flex', gap: '16px', alignItems: 'flex-start' },
  avatar: { width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover', flexShrink: 0 },
  avatarFallback: {
    width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(0,217,126,0.12)',
    color: '#00D97E', fontWeight: 700, fontSize: '18px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  name: { fontSize: '18px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.4px' },
  email: { fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '3px' },
  firm: { fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginTop: '4px', fontWeight: 500 },
  divider: { height: '1px', background: 'rgba(255,255,255,0.06)' },
  infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  thesis: {
    fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.7',
    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '10px', padding: '14px 16px', margin: 0,
  },
  pills: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  pill: {
    background: 'rgba(0,217,126,0.08)', color: '#00D97E', fontSize: '12px', fontWeight: 600,
    padding: '4px 12px', borderRadius: '100px', border: '1px solid rgba(0,217,126,0.15)',
  },
  footer: {
    display: 'flex', gap: '12px', padding: '20px 28px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  rejectBtn: {
    flex: 1, background: 'rgba(255,107,107,0.08)', color: '#ff6b6b',
    border: '1px solid rgba(255,107,107,0.2)', borderRadius: '10px',
    padding: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s',
  },
  approveBtn: {
    flex: 2, background: '#00D97E', color: '#0a0a0a',
    border: 'none', borderRadius: '10px',
    padding: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s',
  },
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const InvestorApprovalsPage = () => {
  const [requests, setRequests] = useState<InvestorApprovalRequest[]>(DUMMY_APPROVAL_REQUESTS);
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
  const [selectedRequest, setSelectedRequest] = useState<InvestorApprovalRequest | null>(null);
  const [search, setSearch] = useState('');

  const pendingRequests = requests.filter(
    (r) => r.status === 'pending' || r.status === 'under_review'
  );
  const historyRequests = requests.filter(
    (r) => r.status === 'approved' || r.status === 'rejected'
  );

  const displayList = (activeTab === 'pending' ? pendingRequests : historyRequests).filter((r) =>
    r.fullName.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleApprove = (id: string) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: 'approved' } : r));
    setSelectedRequest(null);
  };

  const handleReject = (id: string) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: 'rejected' } : r));
    setSelectedRequest(null);
  };

  return (
    <div style={styles.root}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Investor Approvals</h1>
          <p style={styles.subtitle}>Review and approve investor verification requests to maintain platform trust.</p>
        </div>
        {pendingRequests.length > 0 && (
          <div style={styles.pendingAlert}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            {pendingRequests.length} pending request{pendingRequests.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Tabs + Search */}
      <div style={styles.toolbar}>
        <div style={styles.tabs}>
          <button
            onClick={() => setActiveTab('pending')}
            style={{ ...styles.tab, ...(activeTab === 'pending' ? styles.tabActive : {}) }}
          >
            Pending Requests
            {pendingRequests.length > 0 && (
              <span style={styles.tabBadge}>{pendingRequests.length}</span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            style={{ ...styles.tab, ...(activeTab === 'history' ? styles.tabActive : {}) }}
          >
            History
          </button>
        </div>

        <div style={styles.searchWrap}>
          <svg style={styles.searchIcon} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email…"
            style={styles.searchInput}
          />
        </div>
      </div>

      {/* List */}
      <div style={styles.list}>
        {displayList.map((req) => (
          <div
            key={req.id}
            style={styles.card}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
          >
            {/* Left: avatar + info */}
            <div style={styles.cardLeft}>
              {req.avatarUrl ? (
                <img src={req.avatarUrl} alt={req.fullName} style={styles.avatar} />
              ) : (
                <div style={styles.avatarFallback}>
                  {req.fullName.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              <div>
                <div style={styles.cardName}>{req.fullName}</div>
                <div style={styles.cardEmail}>{req.email}</div>
                {req.firmName && <div style={styles.cardFirm}>{req.firmName}</div>}
              </div>
            </div>

            {/* Middle: meta */}
            <div style={styles.cardMeta}>
              <TypeBadge type={req.investorType} />
              {req.aum && (
                <span style={styles.aum}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                  </svg>
                  {req.aum}
                </span>
              )}
              <span style={styles.docCount}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                {req.documents.length} docs
              </span>
            </div>

            {/* Right: status + date + actions */}
            <div style={styles.cardRight}>
              <StatusBadge status={req.status} />
              <span style={styles.date}>{req.submittedAt}</span>
              <button
                onClick={() => setSelectedRequest(req)}
                style={styles.reviewBtn}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#00D97E'; e.currentTarget.style.color = '#0a0a0a'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,217,126,0.1)'; e.currentTarget.style.color = '#00D97E'; }}
              >
                {activeTab === 'history' ? 'View' : 'Review'}
              </button>
            </div>
          </div>
        ))}

        {displayList.length === 0 && (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.25)' }}>
              {activeTab === 'pending' ? 'No pending requests' : 'No history yet'}
            </span>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedRequest && (
        <RequestDetailModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  root: { display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: "'DM Sans', sans-serif" },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' },
  title: { fontSize: '26px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.5px', margin: 0 },
  subtitle: { fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' },
  pendingAlert: {
    display: 'flex', alignItems: 'center', gap: '8px',
    background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
    borderRadius: '10px', padding: '10px 16px', fontSize: '13px', fontWeight: 600, color: '#f59e0b',
  },
  toolbar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' },
  tabs: { display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '4px' },
  tab: {
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '8px 18px', borderRadius: '8px', border: 'none',
    fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', cursor: 'pointer',
    background: 'transparent', transition: 'all 0.15s',
  },
  tabActive: { background: 'rgba(0,217,126,0.12)', color: '#00D97E' },
  tabBadge: {
    background: '#00D97E', color: '#0a0a0a', fontSize: '10px', fontWeight: 700,
    padding: '2px 7px', borderRadius: '100px',
  },
  searchWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
  searchIcon: { position: 'absolute', left: '12px', pointerEvents: 'none' },
  searchInput: {
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px', padding: '9px 14px 9px 34px', fontSize: '13px', color: '#ffffff',
    outline: 'none', width: '240px',
  },
  list: { display: 'flex', flexDirection: 'column', gap: '10px' },
  card: {
    display: 'flex', alignItems: 'center', gap: '20px',
    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '14px', padding: '18px 22px', transition: 'border-color 0.15s',
    flexWrap: 'wrap',
  },
  cardLeft: { display: 'flex', alignItems: 'center', gap: '14px', flex: '1', minWidth: '200px' },
  avatar: { width: '44px', height: '44px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 },
  avatarFallback: {
    width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(0,217,126,0.1)',
    color: '#00D97E', fontWeight: 700, fontSize: '14px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  cardName: { fontSize: '14px', fontWeight: 600, color: '#ffffff', lineHeight: 1.3 },
  cardEmail: { fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' },
  cardFirm: { fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '2px', fontWeight: 500 },
  cardMeta: { display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' },
  aum: { display: 'flex', alignItems: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.4)' },
  docCount: { display: 'flex', alignItems: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.4)' },
  cardRight: { display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto' },
  date: { fontSize: '12px', color: 'rgba(255,255,255,0.3)' },
  reviewBtn: {
    padding: '8px 18px', background: 'rgba(0,217,126,0.1)', color: '#00D97E',
    border: '1px solid rgba(0,217,126,0.2)', borderRadius: '8px',
    fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
  },
  empty: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
    padding: '60px 24px', background: 'rgba(255,255,255,0.01)',
    border: '1px dashed rgba(255,255,255,0.07)', borderRadius: '14px',
  },
  emptyIcon: {
    width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)',
    border: '1px dashed rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
};

export default InvestorApprovalsPage;