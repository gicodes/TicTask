"use client";

import styles from "@/app/page.module.css";
import Link from "next/link";
import { apiGet } from "@/lib/api";
import { BlogRes } from "@/types/axios";
import { BlogCardProps } from "@/types/resources";
import React, { useEffect, useState } from "react";
import { BlogCard } from "@/app/resources/_level_2/blogCard";
import { Box, Grid, Typography, Button } from "@mui/material";
import DeleteButton from "@/app/resources/_level_1/deleteResource";
import { ResourceHero } from "@/app/resources/_level_3/resourcesPage";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<BlogCardProps[]>([]);

  const load = async () => {
    const res: BlogRes = await apiGet("/resources/blog");
    setBlogs(res.data);
  };
  useEffect(() => { load(); }, []);

  return (
    <Box>
      <ResourceHero title="Blog" subtitle="Community insights, product updates, and stories." />
      <Box maxWidth={1100} mx="auto" px={2} py={8}>
        <Box display="flex" justifyContent="space-between" mb={4}>
          <Typography variant="h5">Latest posts</Typography>
          <Button 
            component={Link} 
            href="/resources/blog/create" 
            variant="contained"
            className={styles.btnPrimary}
          >
            Write a post
          </Button>
        </Box>

        <Grid container spacing={3}>
          {blogs.map((b) => (
            <Grid key={b.id}>
              <BlogCard {...b} />
              <Box mt={1} display="flex" justifyContent="flex-end">
                <DeleteButton endpoint="/resources/blog" id={b.id} onDeleted={load} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
