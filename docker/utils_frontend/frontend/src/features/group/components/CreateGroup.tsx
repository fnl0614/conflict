import { CenteredModal } from '../../../shared/components/ui/CustomModal';
import CreateGroupForm from './form/CreateGroupForm';

import { useUtils } from '../../../shared/hooks/useUtils';

interface NewGroupProps {
	show: boolean;
	setter: (show: boolean) => void;
}

const CreateGroup = ({show, setter} : NewGroupProps) => {

	const { t } = useUtils();
	const bottomText = t("group.createGroupExplication");
	const title = t("group.createGroupShort");

	return (
		<CenteredModal
			open={show}
			setter={setter}
			Content={<CreateGroupForm />}
			title={title}
			bottomText={bottomText}
		/>
	);
}

export default CreateGroup;
