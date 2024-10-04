import { convert } from "html-to-text";

export const htmlToTextConverter = (html: string) => {
  return convert(html);
};
