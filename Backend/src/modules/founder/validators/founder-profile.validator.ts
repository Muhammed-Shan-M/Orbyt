
import { z } from "zod";
import { ERROR_MESSAGES } from "../../../common/constands/error-message.constands";

export const roleTitleSchema = z
    .string()
    .min(2)
    .max(100)
    .transform(val => val.trim());

export const bioSchema = z
    .string()
    .min(10)
    .max(1000)
    .transform(val => val.trim());

export const experienceYearsSchema = z
    .number()
    .min(0)
    .max(100);

export const startupNameSchema = z
    .string()
    .min(2, ERROR_MESSAGES.FOUNDER.INVALID_STARTUP_NAME)
    .max(100, ERROR_MESSAGES.FOUNDER.INVALID_STARTUP_NAME)
    .transform(val => val.trim());

export const startupIndustrySchema = z
    .string()
    .min(2, ERROR_MESSAGES.FOUNDER.INVALID_INDUSTRY)
    .max(100, ERROR_MESSAGES.FOUNDER.INVALID_INDUSTRY)
    .transform(val => val.trim());

export const startupStageSchema = z
    .string()
    .min(2, ERROR_MESSAGES.FOUNDER.INVALID_STARTUP_STAGE)
    .max(50, ERROR_MESSAGES.FOUNDER.INVALID_STARTUP_STAGE)
    .transform(val => val.trim());

export const startupDescriptionSchema = z
    .string()
    .min(10, ERROR_MESSAGES.FOUNDER.INVALID_DESCRIPTION)
    .max(2000, ERROR_MESSAGES.FOUNDER.INVALID_DESCRIPTION)
    .transform(val => val.trim());

export const fundingAskSchema = z
    .number()
    .nonnegative(
        ERROR_MESSAGES.FOUNDER.INVALID_FUNDING_AMOUNT
    );

export const equityOfferedSchema = z
    .number()
    .min(
        0,
        ERROR_MESSAGES.FOUNDER.INVALID_EQUITY_PERCENTAGE
    )
    .max(
        100,
        ERROR_MESSAGES.FOUNDER.INVALID_EQUITY_PERCENTAGE
    );

export const urlSchema = z
    .string()
    .url(ERROR_MESSAGES.FOUNDER.INVALID_URL)
    .transform(val => val.trim());

export const stringArraySchema = z.array(
    z.string().trim()
);