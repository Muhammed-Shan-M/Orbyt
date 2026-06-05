


// - remove type any form interface of the controler and services 










// TODO: the error message are didnt hit in frondent check it out and fix it 












// backend/
// │
// ├── src/
// │
// │   ├── modules/                # 🔥 FEATURE-BASED
// │   │
// │   │   ├── auth/
// │   │   │   ├── auth.controller.js
// │   │   │   ├── auth.service.js
// │   │   │   ├── auth.repository.js
// │   │   │   ├── auth.routes.js
// │   │   │   ├── auth.validator.js
// │   │   │   └── auth.dto.js
// │   │
// │   │   ├── user/
// │   │   ├── profile/
// │   │   ├── match/
// │   │   ├── chat/
// │   │   ├── meeting/
// │   │   ├── deal/
// │   │   ├── subscription/
// │   │   ├── notification/
// │   │   └── admin/
// │   │
// │   ├── common/                # 🔁 SHARED LOGIC
// │   │
// │   │   ├── database/
// │   │   │   ├── db.js
// │   │   │   └── connection.js
// │   │
// │   │   ├── middleware/
// │   │   │   ├── auth.middleware.js
// │   │   │   ├── error.middleware.js
// │   │   │   └── role.middleware.js
// │   │
// │   │   ├── utils/
// │   │   │   ├── token.util.js
// │   │   │   ├── email.util.js
// │   │   │   └── hash.util.js
// │   │
// │   │   ├── constants/
// │   │   │   ├── roles.js
// │   │   │   └── statuses.js
// │   │
// │   │   ├── errors/
// │   │   │   ├── AppError.js
// │   │   │   └── errorCodes.js
// │   │
// │   │   └── types/
// │
// │   ├── config/
// │   │   ├── env.js
// │   │   └── index.js
// │
// │   ├── app.js
// │   └── server.js
// │
// ├── package.json
// └── .env