import { useFormContext } from "react-hook-form";
import {
  Grid,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Box,
} from "@mui/material";

export default function ReviewSubmitStep() {
  const { getValues } = useFormContext();
  const data = getValues();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review Your Information
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={3}>
        <Grid>
          <Typography variant="subtitle2" color="text.secondary">
            Personal Information
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Name" secondary={data.fullName || "—"} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Position" secondary={data.position || "—"} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email" secondary={data.email} />
            </ListItem>
          </List>
        </Grid>

        <Grid>
          <Typography variant="subtitle2" color="text.secondary">
            Company Profile
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Company" secondary={data.companyName || "—"} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Website" secondary={data.website || "—"} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Industry" secondary={data.industry || "—"} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Team Size" secondary={data.teamSize || "—"} />
            </ListItem>
          </List>
        </Grid>

        <Grid>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Partnership Details
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight={500}>
              Selected Roles:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {(data.partnerRoles || []).length > 0 ? (
                data.partnerRoles.map((role: string) => (
                  <Chip key={role} label={role} color="primary" variant="outlined" />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  None selected
                </Typography>
              )}
            </Box>
          </Box>

          <Typography variant="body2" fontWeight={500} gutterBottom>
            About / Description:
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
            {data.description || "—"}
          </Typography>

          {data.collaborationGoals && (
            <>
              <Typography variant="body2" fontWeight={500} mt={2} gutterBottom>
                Collaboration Goals:
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                {data.collaborationGoals}
              </Typography>
            </>
          )}

          <Typography variant="body2" fontWeight={500} mt={2} gutterBottom>
            Preferred Contact:
          </Typography>
          <Chip
            label={
              data.preferredContact === "email"
                ? "Email"
                : data.preferredContact === "phone"
                ? "Phone / WhatsApp"
                : "Both"
            }
            color="default"
            size="small"
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="body2" color="text.secondary" textAlign="center">
        Please review everything above. Once submitted, our team will review your application
        and get back to you soon.
      </Typography>
    </Box>
  );
}