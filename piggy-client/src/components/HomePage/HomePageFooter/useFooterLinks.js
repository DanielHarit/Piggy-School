import { useCallback } from 'react'
import { HOMEPAGE_CONSTANTS } from '../../../constants'

export const useFooterLinks = (footerType) => {
  return useCallback(() => {
    switch (footerType) {
      case HOMEPAGE_CONSTANTS.CHILD_FOOTER:
        return {
          rightLink: {
            label: 'דף בית',
          },
          middleLink: {
            label: 'פרופיל',
          },
          leftLink: {
            label: 'חנות',
          },
        }
      case HOMEPAGE_CONSTANTS.PARENT_FOOTER:
        return {
          rightLink: {
            label: 'דף בית',
          },
          middleLink: {
            label: 'העבר',
          },
          leftLink: {
            label: 'פרופיל',
          },
        }
    }
  }, [])
}
