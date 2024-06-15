import vine,{SimpleMessagesProvider} from "@vinejs/vine";
import {CustomErrorReporter} from './customErrorMsg'

vine.errorReporter=()=> new CustomErrorReporter();

export const usercreation_schema = vine.object({
    email: vine.string().email(),
    password: vine
      .string()
      .minLength(8)
      .maxLength(32),
    mobile:vine.string().minLength(10).maxLength(10).nullable()
  })
 // import vine, { SimpleMessagesProvider } from '@vinejs/vine'



