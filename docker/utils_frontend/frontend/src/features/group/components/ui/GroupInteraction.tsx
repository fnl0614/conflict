import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CustomLargeBtn, CustomBtn } from '../../../../shared/components/ui/CustomButton';

interface GroupInteractionProps {
	type: string;
}

const WbGroupInteraction = ({ type }: GroupInteractionProps) => {

	const [t] = useTranslation("global");

	switch (type) {
		case 'join':
			return <CustomLargeBtn bgColor='accent_2' title={t("group.join")} />
		case 'quit':
			return <CustomLargeBtn bgColor='accent_1' title={t("group.quit")} />
		case 'pending':
			return <CustomLargeBtn bgColor='secondary_1' title={t("group.pending")} />
		case 'invitation':
			return (
				<Stack spacing={1} width={'100%'}>
					<CustomLargeBtn bgColor='accent_2' title={t("common-group-friend.accept")} />
					<CustomLargeBtn bgColor='accent_1' title={t("common-group-friend.decline")} />
				</Stack>
			)
		default:
			return null;
	}
};

const MbGroupInteraction = ({ type }: GroupInteractionProps) => {

	const [t] = useTranslation("global");

	switch (type) {
		case 'join':
			return <CustomBtn bgColor='accent_2' title={t("group.join")} />
		case 'quit':
			return <CustomBtn bgColor='accent_1' title={t("group.quit")} />
		case 'pending':
			return <CustomBtn bgColor='secondary_1' title={t("group.pending")} />
		case 'invitation':
			return (
				<Stack spacing={1}>
					<CustomBtn bgColor='accent_2' title={t("common-group-friend.accept")} />
					<CustomBtn bgColor='accent_1' title={t("common-group-friend.decline")} />
				</Stack>
			)
		default:
			return null;
	}
};

export { MbGroupInteraction, WbGroupInteraction };
