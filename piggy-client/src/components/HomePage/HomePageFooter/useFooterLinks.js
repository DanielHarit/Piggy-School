import { useCallback } from 'react';
import { HOMEPAGE_CONSTANTS } from '../../../constants';
import { AccountCircle } from '@mui/icons-material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import SendIcon from '@mui/icons-material/Send';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

export const useFooterLinks = (footerType) => {
	return useCallback(() => {
		switch (footerType) {
			case HOMEPAGE_CONSTANTS.CHILD:
				return {
					rightLink: {
						label: 'חנות',
						icon: <StorefrontIcon />,
					},
					middleLink: {
						label: 'פרופיל',
						icon: <PermIdentityOutlinedIcon />,
					},
					leftLink: {
						label: 'הגדרות',
						icon: <DensityMediumIcon />,
					},
				};
			case HOMEPAGE_CONSTANTS.PARENT:
				return {
					rightLink: {
						label: 'העבר',
						icon: <SendIcon />,
					},
					middleLink: {
						label: 'פרופיל',
						icon: <AccountCircle />,
					},
					leftLink: {
						label: 'הגדרות',
						icon: <DensityMediumIcon />,
					},
				};
		}
	}, []);
};
