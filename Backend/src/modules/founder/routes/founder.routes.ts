import { FounderController } from "../controller/impliments/founder.controller";
import { FounderMapper } from "../mappers/founder.mapper";
import { FounderRepository } from "../repositories/impliments/founder.repository";
import { FounderService } from "../services/impliments/founder.service";

const founderRepository = new FounderRepository();

const founderMapper = new FounderMapper();

const founderService = new FounderService(founderRepository, founderMapper);

const founderController = new FounderController(founderService);

router.post("/profile", validateRequest(founderProfileSchema), founderController.saveProfile.bind(founderController));