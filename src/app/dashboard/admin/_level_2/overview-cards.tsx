import React from "react";
import { StatCardProps, DataTableProps } from "../_level_1/types";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Download, Refresh, Search } from "@mui/icons-material";
import { BiUser } from "react-icons/bi";
import { TbLogs } from "react-icons/tb";
import { RiBloggerLine } from "react-icons/ri";
import { SiAwsorganizations } from "react-icons/si";
import { MdQuestionAnswer, MdWorkHistory } from "react-icons/md";
import { FaUsers, FaUserGroup, FaAddressBook } from "react-icons/fa6";
import { GiMoneyStack, GiThreeFriends, GiTicket } from "react-icons/gi";
import { FcSerialTasks, FcDataEncryption, FcParallelTasks, FcMoneyTransfer } from "react-icons/fc";

export function StatCardGrid({ cards }: { cards: StatCardProps[] }) {
  return (
    <Box sx={{ display: "grid", gap: 2, mb: 4,
      gridTemplateColumns: {
        xs: "1fr",
        sm: "repeat(2, 1fr)",
        md: "repeat(4, 1fr)",
      },
    }}>
      {cards.map((card, i) => (
        <StatCard key={i} {...card} />
      ))}
    </Box>
  );
}

export function StatCard({ title, value, delta, icon, meta, element }: StatCardProps) {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2.5,
        display: "flex",
        gap: 2,
        alignItems: "center",
        borderRadius: 2,
        height: "100%",
        minWidth: { xs: 300, sm: 250 },
        width: '100%',
        transition: "transform 0.2s",
        "&:hover": { transform: "translateY(-2px)" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 56,
          height: 56,
          borderRadius: 2,
          bgcolor: "background.default",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="subtitle2" color="text.secondary" noWrap>
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mt: 0.5 }}>
          <Typography variant="h5" fontWeight={600}>
            {element && element}{value==="undefined" ? "___" : value}
          </Typography>
          {delta && (
            <Typography variant="body2" color="success.main" fontWeight={500}>
              {delta}
            </Typography>
          )}
        </Box>

        {meta && (
          <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
            {meta==="undefined" ? "___" : meta}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export function DataTable({ columns, rows }: DataTableProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box p={1} maxWidth={'96vw'}>
      <Box
        sx={{
          my: 1,
          width: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
          borderRadius: 2,
          border: '0.1px solid var(--dull-gray)',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'thin',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': { height: 8 },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--secondary)',
            borderRadius: 10,
          },
          '@media (max-width: 600px)': {
            display: 'block',
            maxWidth: '90vw',
          },
        }}
      >
        <Box
          sx={{
            minWidth: 750,
            width: '100%',
            borderCollapse: 'collapse',
            tableLayout: 'auto',
          }}
        >
          <TableContainer
            component={Paper}
            elevation={0}
          >
            <Table size={isMobile ? "small" : "medium"} stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((c) => (
                    <TableCell
                      key={c}
                      sx={{
                        fontWeight: 600,
                        bgcolor: "background.paper",
                        whiteSpace: "nowrap",
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        height: 44,
                      }}
                    >
                      {c}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">No data available</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((r, idx) => (
                    <TableRow key={idx} hover>
                      {columns.map((c) => (
                        <TableCell
                          key={c}
                          sx={{
                            whiteSpace: { xs: "nowrap", sm: "normal" },
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                            height: 40
                          }}
                        >
                          {String(r[c] ?? "")}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>  
  )
}

export function Filters({ children }: { children?: React.ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 2, md: 2 },
        alignItems: { xs: "stretch", md: "center" },
        justifyContent: "space-between",
        mb: 3,
        px: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          flex: 1,
          "& > *": {
            width: { xs: "100%", sm: "auto" },
            minWidth: { sm: 180 },
          },
        }}
      >
        {children}
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: { xs: "stretch", md: "flex-end" },
          "& > *": { flex: { xs: 1, md: "auto" } },
        }}
      >
        <IconButton size={isMobile ? "medium" : "small"} aria-label="export">
          <Download />
        </IconButton>
        <IconButton size={isMobile ? "medium" : "small"} aria-label="refresh">
          <Refresh />
        </IconButton>
      </Box>
    </Box>
  );
}

export function SearchField({
  placeholder = "Search...",
  value = "",
  onChange,
}: {
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <TextField
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      InputProps={{
        startAdornment: <Search fontSize="small" sx={{ mr: 1, color: "text.disabled" }} />,
      }}
      sx={{
        minWidth: { xs: "100%", sm: 240 },
        "& .MuiInputBase-root": { borderRadius: 2 },
      }}
    />
  );
}

export function SelectField({
  value,
  onChange,
  options,
  label = "Filter",
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  label?: string;
}) {
  return (
    <FormControl size="small" fullWidth={useMediaQuery("(max-width:600px)")} sx={{ minWidth: { xs: "100%", sm: 160 } }}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={(e) => onChange(e.target.value as string)}>
        {options.map((o) => (
          <MenuItem key={o} value={o}>
            {o}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export const Icons = {
  Tickets: () => <FcParallelTasks size={24} />,
  Ticket: () => <FcSerialTasks size={24} />,
  SupportTicket: () => <GiTicket size={24} />,
  Metrics: () => <FcDataEncryption size={24} />,
  Revenue: () => <FcMoneyTransfer size={24} />,
  Money: () => <GiMoneyStack size={24} />,
  Teams: () => <SiAwsorganizations size={24} />,
  Users: () => <FaUserGroup size={24} />,
  User: () => <BiUser size={24} />,
  Logs: () => <TbLogs size={24} />,
  Partners: () => <GiThreeFriends size={24} />,
  Careers: () => <MdWorkHistory size={24} />,
  Blog: () => <RiBloggerLine size={24} />,
  FAQ: () => <MdQuestionAnswer size={24} />,
  Team: () => <FaUsers size={24} />,
  Contact: () => <FaAddressBook size={24} />,
};

const AdminComponents = {
  StatCard,
  StatCardGrid,
  DataTable,
  Filters,
  SearchField,
  SelectField,
  Icons,
};

export default AdminComponents;