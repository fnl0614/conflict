import { Stack, Checkbox, Typography } from '@mui/material';
import { CaptionLink } from '../../../../shared/layouts/Footer';
import { useUtils } from '../../../../shared/hooks/useUtils';
import { Controller, type Control, type FieldValues } from "react-hook-form";

interface LegalCheckingProps<T extends FieldValues> {
	control: Control<T>;
}

const LegalChecking = <T extends FieldValues>({control }: LegalCheckingProps<T>) => {

  const { t } = useUtils();

  return (
	<Stack direction="row" spacing={1} alignItems="center">
		<Controller
			name={"termsAccepted" as any}
			control={control}
			render={({ field }) => (
				<Checkbox
					checked={!!field.value}
					onChange={(e, checked) => {
						e.preventDefault();
						field.onChange(checked)
					}}
				/>
			)}
		/>
		<Typography variant="body2" color="textSecondary">
			{t("authentication-page.condition")}
		<CaptionLink link="/termsOfService" text={t("legal.termsOfService.title")} />
			{t("authentication-page.and")}
		<CaptionLink link="/privacyPolicy" text={t("legal.privacyPolicy.title")} />
		</Typography>
	</Stack>
  );
};

export default LegalChecking;