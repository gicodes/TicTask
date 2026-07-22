"use client";

import { Trash2 } from "lucide-react";
import { apiDelete } from "@/lib/axios";
import { useAlert } from "@/providers/alert";
import { Card, IconButton, Tooltip } from "@mui/material";

interface DeleteButtonProps {
  endpoint: string;  
  id: string | number; 
  onDeleted?: () => void; 
}

export default function DeleteButton({ 
  endpoint, 
  id, 
  onDeleted 
}: DeleteButtonProps
) {
  const { showAlert, confirm } = useAlert();

  const handleDelete = async () => {
    const confirmed = await confirm(
      "Are you sure you want to delete this item? This action cannot be undone.",
      "Delete Item"
    );

    if (!confirmed) return;

    try {
      await apiDelete(`${endpoint}/${id}`);

      onDeleted?.();

      showAlert("Delete Success", "success");
    } catch (err) {
      console.error(err);

      let errMessage = "Failed to delete item.";

      if (
        err &&
        typeof err === "object" &&
        "message" in err
      ) {
        errMessage = String(err.message);
      }

      showAlert(errMessage, "error");
    }
  };

  return (
    <Tooltip title="Delete item?">
      <Card sx={{ borderRadius: '50%', bgcolor: 'var(--surface-2)', boxShadow: 2}}>
      <IconButton size="medium" color="error" onClick={handleDelete}>
        <Trash2 size={20} />
      </IconButton></Card>
    </Tooltip>
  );
}
