"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { apiDelete } from "@/lib/api";
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
  const { showAlert } = useAlert();

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this item? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await apiDelete(`${endpoint}/${id}`);
      onDeleted?.();
      showAlert("Delete Success", "success")
    } catch (err) {
      console.error("❌ Delete failed:", err);
      let errMessage;
      if (err && typeof err==="object" && "message" in err) 
        errMessage = err.message || "Failed to delete the item.";
      showAlert(`${errMessage}`, "error")
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
