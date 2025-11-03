"use client";

import styles from "@/app/page.module.css";
import { ResourceHero } from "../_level_3";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ChangelogItem } from "../_level_2/changeLog";
import DeleteButton from "../_level_1/deleteResource";
import { ChangeLogProps } from "@/types/resources";
import { ChangeLostRes } from "@/types/axios";
import { useAuth } from "@/providers/auth";
import { apiGet } from "@/lib/api";
import Link from "next/link";

export default function ChangelogList() {
  const { user, isAdmin } = useAuth();
  const [items, setItems] = useState<ChangeLogProps[] | null>([]);
  
  const load = async () => {
    const res: ChangeLostRes = await apiGet("/resources/changelog");
    setItems(res.update);
  };
  useEffect(()=>{ load(); }, []);

  return (
    <Box>
      <ResourceHero title="Changelog" subtitle="Track releases, fixes, and updates." />
      <Box maxWidth={900} mx="auto" px={2} py={8}>
        <Box display="flex" justifyContent="space-between" mb={4}>
          <Typography variant="h5">Release notes</Typography>
          <Typography 
            component={Link} 
            className={styles.btnPrimary}
            href="/resources/changelog/create" 
          >
            New update
          </Typography>
        </Box>
        {items?.map(item => (
          <Box key={item.id} mb={2}>
            <ChangelogItem version={item.version} date={new Date(item.date).toLocaleString()} highlights={item.highlights} />
            {user && isAdmin && <Box display={"flex"} justifyContent="flex-end">
              <DeleteButton endpoint="/resources/changelog" id={item.id} onDeleted={load} />
            </Box>}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
