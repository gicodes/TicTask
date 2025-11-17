import React from 'react'
import { MdSettings } from 'react-icons/md'
import { RiRobot2Fill } from 'react-icons/ri'
import { SiAwsorganizations } from 'react-icons/si'
import { Box, Card, Divider, Typography } from '@mui/material'
import { FcSerialTasks, FcDataEncryption, FcInvite } from 'react-icons/fc'
import { BsCalendar2Date, BsFillCreditCard2BackFill } from 'react-icons/bs'

const Page = () => {
  return (
    <Box maxWidth={1000} mx={'auto'}>
      <Card sx={{ my: 5, py: 3, px: 5 }}>
        <h3>Complete Dashboard Walkthrough</h3>
        <Divider sx={{ mb: 5}} />

        <Typography>
          The <strong>TicTask Dashboard</strong> is the command center of your workspace — where you manage tickets, collaborate with your team, monitor progress, and access core product features.
          It is structured into three primary layers:
        </Typography>

        <ul style={{ margin: '20px 15px 0', lineHeight: 2}}>
          <li><strong>Dashboard Header</strong> — quick-access navigation, notifications, and profile actions.</li>
          <li><strong>Menu Pages</strong> — core pages such as Tickets, Planner, Metrics, AI, Team, and Settings.</li>
          <li><strong>Overview Pages</strong> — the functional work areas for interacting with your workspace data.</li>
        </ul>

        <Typography my={3}>
          The <strong>Dashboard Header</strong> gives you quick access to your personal actions, 
          user settings, workspace tools, and global navigation. It stays clean and responsive across all screen sizes.
        </Typography>

        {/* MOBILE MENU ICON */}
        <Typography variant="h6" fontWeight={501} mt={3}>Mobile Menu Icon</Typography>
        <Typography mt={1}>
          On small screens (Top-left corner) i.e. mobile, smartphones, etc.. the sidebar menu is hidden.  
          The header displays an icon button that opens the full navigation panel for pages such as:
        </Typography>
        <ul style={{ margin: '10px 15px 0', lineHeight: 2}}>
          <li>Tickets</li>
          <li>Planner</li>
          <li>AI</li>
          <li>Team</li>
          <li>Metrics</li>
          <li>Settings</li>
        </ul>
        <Typography my={1}>
          This ensures the dashboard remains functional and uncluttered on mobile devices.
        </Typography>

        {/* LOGO */}
        <Typography variant="h6" fontWeight={501} mt={4}>Logo</Typography>
        <Typography mt={1}>Click on the Logo Icon to go to Dashboard Home.</Typography>
        <Typography mt={1}>
          This gives logged-in users a consistent way to return to the dashboard overview.
        </Typography>
        <Typography mt={1}>
          Since you already have a <strong>Go to Home</strong> link inside the user menu, redirecting the logo to the dashboard is simple and more user-friendly.
        </Typography>

        {/* USER IDENTITY BLOCK */}
        <Typography variant="h6" fontWeight={501} mt={4}>User Identity Block</Typography>
        <Typography mt={1}>
          This section (Top-right corner) displays the user&apos;s avatar, name, email, and role.  
          Clicking the block redirects to the user&apos;s profile page.
        </Typography>
        <Typography mt={1}>It typically includes:</Typography>
        <ul style={{ margin: '10px 15px 0', lineHeight: 2}}>
          <li><strong>Avatar</strong> (profile picture or initials)</li>
          <li><strong>Name & Email</strong> (linking to profile)</li>
          <li><strong>User Role</strong> (Admin, Manager, Member)</li>
        </ul>
        <Typography mt={1}>
          This allows users to quickly confirm their identity and access personal settings.
        </Typography>

        {/* SET STATUS */}
        <Typography variant="h6" fontWeight={501} mt={4}>Set Status</Typography>
        <Typography mt={1}>
          🗿 &quot;Set Status&quot; action allow users to update their presence, custom emoji status, or team availability.
        </Typography>

        {/* MUTE NOTIFICATIONS */}
        <Typography variant="h6" fontWeight={501} mt={4}>Mute Notifications</Typography>
        <Typography mt={1}>
          🔕 &quot;Mute Notifications&quot; action allows users to silence notifications temporarily.
        </Typography>

        {/* EXTERNAL LINKS */}
        <Typography variant="h6" fontWeight={501} mt={4}>External Links & Utilities</Typography>
        <Typography mt={1}>
          The header menu includes several helpful external pages that support onboarding, learning, 
          billing, and product exploration:
        </Typography>

        <ul style={{ margin: '10px 15px 0', lineHeight: 2}}>
          <li>Become a Partner</li>
          <li>Changelog</li>
          <li>Watch Videos (YouTube)</li>
          <li>Pricing</li>
          <li>Contact Us</li>
          <li>Donate</li>
          <li>Go to Home</li>
          <li>Logout</li>
        </ul>

        <Typography mt={1}>
          These are intentionally separated from core dashboard navigation to avoid clutter and to allow users access to 
          documentation, support, and external resources quickly.
        </Typography>

        {/* ============================= */}
        {/*    TICKETS OVERVIEW           */}
        {/* ============================= */}
        <Typography alignItems={'center'} gap={2} display={'flex'} variant="h6" fontWeight={501} mt={4} mb={1}><FcSerialTasks/> Tickets Overview</Typography>
        <Typography mb={2}>
          Tickets are the core of TicTask. Each task, issue, or workflow item is represented as a ticket.  
          You can manage them in two main views:
        </Typography>

        <Typography component={'button'} sx={{ bgcolor: 'inherit', color: 'inherit'}} px={1} my={1} fontWeight={501}>Board View</Typography>
        <Typography>
          The <strong>Board</strong> gives you a visual, Kanban-style workflow. Tickets are organized into status columns, and you can drag-and-drop cards to update their status.
        </Typography>

        <Typography mt={3}>Default workflow columns:</Typography>
        <ul style={{ margin: '10px 15px 0', lineHeight: 2}}>
          <li>Upcoming</li>
          <li>Open</li>
          <li>In Progress</li>
          <li>Resolved</li>
          <li>Closed</li>
          <li>Cancelled</li>
        </ul>
        <Typography my={2}>
          Each column displays detailed ticket cards containing title, priority, due date, assignee, and quick actions.
        </Typography>

        <Typography component={'button'} sx={{ bgcolor: 'inherit', color: 'inherit'}} px={1} my={1} fontWeight={501}>List View</Typography>
        <Typography>
          The <strong>List</strong> view displays tickets in a detailed table layout.  
          It&apos;s ideal for sorting, filtering, and scanning large volumes of work.
        </Typography>

        <Typography mt={1}>Typical columns include:</Typography>
        <ul style={{ margin: '20px 15px 0', lineHeight: 2}}>
          <li>Title</li>
          <li>Priority</li>
          <li>Due Date</li>
          <li>Status</li>
          <li>Assignee</li>
          <li>Created / Updated</li>
        </ul>

        {/* ============================= */}
        {/*    AI ASSISTANT              */}
        {/* ============================= */}
        <Typography alignItems={'center'} gap={2} display={'flex'} variant="h6" fontWeight={501} mt={4} mb={1}><RiRobot2Fill /> AI (Assistant)</Typography>
        <Typography>
          The <strong>AI Page</strong> is your intelligent co-pilot.  
          Use it to quickly generate tasks, summarize long tickets, automate repetitive updates, and get data-driven suggestions.
        </Typography>

        <Typography mt={1}>AI can help you:</Typography>
        <ul style={{ margin: '10px 15px 0', lineHeight: 2}}>
          <li>Create tickets from natural language</li>
          <li>Summarize or rewrite existing tickets</li>
          <li>Suggest next steps based on workload</li>
          <li>Analyze tasks and provide optimization tips</li>
        </ul>

        {/* ============================= */}
        {/*    PLANNER                   */}
        {/* ============================= */}
        <Typography alignItems={'center'} gap={2} display={'flex'} variant="h6" fontWeight={501} mt={4} mb={1}><BsCalendar2Date/> Planner</Typography>
        <Typography>
          The <strong>Planner</strong> provides a timeline-based scheduling view.  
          It&apos;s perfect for arranging work across days, weeks, or months.
        </Typography>
        <ul style={{ margin: '10px 15px 0', lineHeight: 2}}>
          <li>Drag-and-drop tasks to adjust schedules</li>
          <li>See upcoming tasks on a timeline</li>
          <li>Manage sprints, cycles, and deadlines</li>
          <li>Filter tasks by user, priority, or date</li>
        </ul>

        {/* ============================= */}
        {/*    TEAM PAGE                 */}
        {/* ============================= */}
        <Typography alignItems={'center'} gap={2} display={'flex'} variant="h6" fontWeight={501} mt={4} mb={1}><SiAwsorganizations /> Team</Typography>
        <Typography>
          The <strong>Team Page</strong> manages all workspace members.  
          From here, you can adjust access, roles, and collaboration settings.
        </Typography>
        <ul style={{ margin: '10px 15px 0', lineHeight: 2}}>
          <li>Add/remove members</li>
          <li>Assign roles: Admin, Manager, Member</li>
          <li>View workload per member</li>
          <li>Review activity and performance</li>
        </ul>

        {/* ============================= */}
        {/*    SUBSCRIPTION PAGE         */}
        {/* ============================= */}
        <Typography alignItems={'center'} gap={2} display={'flex'} variant="h6" fontWeight={501} mt={4} mb={1}><BsFillCreditCard2BackFill /> Subscription</Typography>
        <Typography>
          Manage your billing and workspace plan.  
          Choose between Free, Pro, and Enterprise.
        </Typography>
        <ul style={{ margin: '10px 15px 0', lineHeight: 2}}>
          <li>Manage payment methods</li>
          <li>Upgrade or downgrade plans</li>
          <li>View next billing date</li>
          <li>Download invoices</li>
        </ul>

        {/* ============================= */}
        {/*    METRICS PAGE              */}
        {/* ============================= */}
        <Typography alignItems={'center'} gap={2} display={'flex'} variant="h6" fontWeight={501} mt={4} mb={1}><FcDataEncryption /> Metrics</Typography>
        <Typography>
          The <strong>Metrics Page</strong> provides insights into team performance and project health.
        </Typography>
        <ul style={{ margin: '10px 15px 0', lineHeight: 2}}>
          <li>Total tickets and workload distribution</li>
          <li>Completed vs. pending stats</li>
          <li>Average resolution time</li>
          <li>Trends over time</li>
          <li>Cycle progress indicators</li>
        </ul>

        {/* ============================= */}
        {/*    INVITE PAGE               */}
        {/* ============================= */}
        <Typography alignItems={'center'} gap={2} display={'flex'} variant="h6" fontWeight={501} mt={4} mb={1}><FcInvite /> Invite</Typography>
        <Typography>
          Quickly grow your workspace by inviting new members.
        </Typography>
        <ul style={{ margin: '10px 15px 0', lineHeight: 2}}>
          <li>Invite via email or generate an invite link</li>
          <li>Set default roles for new members</li>
          <li>Manage pending invites</li>
          <li>Restrict who can invite (Admins-only)</li>
        </ul>

        {/* ============================= */}
        {/*    SETTINGS PAGE             */}
        {/* ============================= */}
        <Typography alignItems={'center'} gap={2} display={'flex'} variant="h6" fontWeight={501} mt={4} mb={1}><MdSettings /> Settings</Typography>
        <Typography>
          The <strong>Settings Page</strong> controls all workspace and personal configuration.
        </Typography>

        <ul style={{ margin: '10px 15px 0', lineHeight: 2}}>
          <li>Workspace profile (name, logo, branding)</li>
          <li>Notifications & preferences</li>
          <li>Ticket settings (default statuses, priorities)</li>
          <li>Integrations (Slack, SMS, email, webhooks)</li>
          <li>Appearance / theme</li>
          <li>Security & authentication settings</li>
          <li>Mute notifications</li>
        </ul>

        <Typography mt={4}>
          This completes the full dashboard walkthrough.  
          Each section helps you structure your workflow and operate efficiently inside TicTask.
        </Typography>
      </Card>
    </Box>
  )
}

export default Page