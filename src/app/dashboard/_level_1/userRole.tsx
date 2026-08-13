import { Tooltip, IconButton } from "@mui/material";
import { FaUserShield, FaUsers, FaUserAstronaut, FaUserTie, FaUserSecret } from "react-icons/fa6";

type UserRoleFn = string | null | (() => string | null);

export const UserRole = ({ userRole }: { userRole: UserRoleFn }) => {
  const raw = typeof userRole === "function" ? userRole() : userRole;
  const role = (raw ?? "").toString();

  return (
    <Tooltip title={role.toLocaleLowerCase()}>
      <IconButton>
        {role === "USER" && <FaUserShield />}
        {role === "ORGANIZATION" && <FaUsers />}
        {role === "MODERATOR" && <FaUserAstronaut />}
        {role === "PARTNER" && <FaUserTie />}
        {role === "ADMIN" && <FaUserSecret />}
      </IconButton>
    </Tooltip>
  );
};