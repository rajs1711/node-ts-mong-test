import vine,{SimpleMessagesProvider} from "@vinejs/vine";
import {CustomErrorReporter} from './customErrorMsg'

vine.errorReporter=()=> new CustomErrorReporter();

export const cateogrycreation_schema = vine.object({
    name: vine.string(),
    slug:vine.string(),
    description:vine.string(),
    isActive:vine.boolean()
  })




