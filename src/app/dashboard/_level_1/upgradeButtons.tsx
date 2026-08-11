import { Button } from "@/assets/buttons";
import { Plan } from "@/types/subscription";
import { Stack } from "@mui/material";
import { FcOrganization } from "react-icons/fc";
import { GiTeamIdea, GiTeamUpgrade } from "react-icons/gi";

type Props = {
  isPersonal: boolean;
  isBusiness: boolean;
  hasOrganization?: boolean;
  onUpgrade: (plan: Plan) => void;
};

export function UpgradeButtons({ isPersonal, isBusiness, hasOrganization, onUpgrade }: Props) {
  return (
    <Stack py={1} spacing={{ xs: 1.5, sm: 2 }} direction={{ xs: 'column', lg: 'row' }}>
      {(isPersonal || isBusiness) && (
        <>
          <Button
            tone="retreat"
            startIcon={<GiTeamIdea />}
            variant="outlined"
            onClick={() => onUpgrade(Plan.STANDARD)}
          >
            Get Standard
          </Button>
          <Button
            tone="action"
            startIcon={<GiTeamUpgrade />}
            variant="contained"
            onClick={() => onUpgrade(Plan.PRO)}
          >
            Upgrade to Pro
          </Button>
        </>
      )}

      {isBusiness && hasOrganization && (
        <Button
          startIcon={<FcOrganization />}
          variant="contained"
          onClick={() => onUpgrade(Plan.ENTERPRISE)}
        >
          Go Enterprise
        </Button>
      )}
    </Stack>
  );
}