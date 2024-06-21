import vine,{SimpleMessagesProvider} from "@vinejs/vine";
import {CustomErrorReporter} from './customErrorMsg'

vine.errorReporter=()=> new CustomErrorReporter();

export const productcreation_schema = vine.object({
    name: vine.string(),
    slug:vine.string(),
    isActive:vine.boolean(),
    price:vine.number(),
    rating:vine.number().nullable(),
    countInStock:vine.number().nullable(),
    cateogryid:vine.string(),
    reviewsids:vine.array(vine.string()).optional()
  })
