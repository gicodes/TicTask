"use client";

import styles from "@/app/page.module.css";
import React, { useEffect, useState } from "react";
import { ResourceHero } from "../_level_3/resourcesPage";
import { Box, Typography, Button } from "@mui/material";
import { ChangelogItem } from "../_level_2/changeLog";
import DeleteButton from "../_level_1/deleteResource";
import { ChangeLogProps } from "@/types/resources";
import { ChangeLostRes } from "@/types/axios";
import { apiGet } from "@/lib/api";
import Link from "next/link";
import { useAuth } from "@/providers/auth";

export default function ChangelogList() {
  const { user } = useAuth();
  const [items, setItems] = useState<ChangeLogProps[]>([]);
  const load = async () => {
    const res: ChangeLostRes = await apiGet("/api/resources/changelog");
    setItems(res.update);
  };
  useEffect(()=>{ load(); }, []);

  return (
    <Box>
      <ResourceHero title="Changelog" subtitle="Track releases, fixes, and updates." />
      <Box maxWidth={900} mx="auto" px={2} py={8}>
        <Box display="flex" justifyContent="space-between" mb={4}>
          <Typography variant="h5">Release notes</Typography>
          <Button 
            component={Link} 
            variant="contained"
            className={styles.btnPrimary}
            href="/resources/changelog/create" 
          >
            New update
          </Button>
        </Box>
        {items.map(item => (
          <Box key={item.id} mb={2}>
            <ChangelogItem version={item.version} date={new Date(item.date).toDateString()} highlights={item.highlights} />
            {user?.role ==="ADMIN" && <Box display={"flex"} justifyContent="flex-end">
              <DeleteButton endpoint="/api/resources/changelog" id={item.id} onDeleted={load} />
            </Box>}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
