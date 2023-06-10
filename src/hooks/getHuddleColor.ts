import COLORS from '@constants/COLORS';

export const getHuddleColor = (
    color: number
): { primaryColor: string; secondaryColor: string } => {
    function getColor(): string {
        switch (color) {
            case 0:
                return COLORS.PASTEL_PURPLE;
            case 1:
                return COLORS.PASTEL_ORANGE;
            case 2:
                return COLORS.PASTEL_BLUE;
            default:
                return COLORS.PASTEL_RED;
        }
    }

    function getSecondaryColor(): string {
        switch (color) {
            case 0:
                return COLORS.PASTEL_PURPLE_100;
            case 1:
                return COLORS.PASTEL_ORANGE_100;
            case 2:
                return COLORS.PASTEL_BLUE_100;
            default:
                return COLORS.PASTEL_RED_100;
        }
    }

    return { primaryColor: getColor(), secondaryColor: getSecondaryColor() };
};
