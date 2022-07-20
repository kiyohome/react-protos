import { useTranslation } from 'react-i18next';
import { ZodIssueCode, ZodIssueOptionalMessage } from 'zod';

type ErrorMapCtx = {
  defaultError: string;
  data: unknown;
};

// 下記のデフォルト実装をベースにエラーメッセージの多言語対応を実施しています。
// https://github.com/colinhacks/zod/blob/master/src/ZodError.ts#L300
const useZod = () => {
  const { t } = useTranslation();

  const customErrorMap = (
    issue: ZodIssueOptionalMessage,
    ctx: ErrorMapCtx
  ): { message: string } => {
    const { code } = issue;

    let message = ctx.defaultError;

    if (code === ZodIssueCode.invalid_type) {
      message = t('zod.required');
    } else if (code === ZodIssueCode.invalid_string) {
      const { validation } = issue;
      if (validation === 'email' || validation === 'url') {
        message = t('zod.string.invalid', { validation: t(validation) });
      }
    } else if (code === ZodIssueCode.too_big) {
      const { type, maximum } = issue;
      if (type === 'string') {
        message = t('zod.string.max', { maximum });
      } else if (type === 'number') {
        message = t('zod.number.max', { maximum });
      }
    } else if (code === ZodIssueCode.too_small) {
      const { type, minimum } = issue;
      if (minimum === 1) {
        message = t('zod.required');
      } else if (type === 'string') {
        message = t('zod.string.min', { minimum });
      } else if (type === 'number') {
        message = t('zod.number.min', { minimum });
      }
    }

    return { message };
  };

  return { customErrorMap };
};

export default useZod;
