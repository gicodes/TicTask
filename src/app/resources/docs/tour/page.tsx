'use client';

import React from 'react';
import { useAuth } from '@/providers/auth';
import AuthRedirectBtn from '@/assets/authRedirectBtn';
import AccordionDisplay, { BannerDisplay } from '../../_level_2/tourAccordion';

import { MdSettings } from 'react-icons/md';
import { BsCalendar2Date, BsFillCreditCard2BackFill } from 'react-icons/bs';
import { FcSerialTasks, FcDataEncryption, FcInvite, FcOrganization } from 'react-icons/fc';
import { 
  Box, 
  Card, 
  Chip, 
  Divider, 
  Stack, 
  Typography 
} from '@mui/material';
import Link from 'next/link';

const Page = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Box maxWidth={1000} mx={'auto'}>
        <Card sx={{ my: 5, py: 3, px: 5 }}>
          <Typography variant="h6" fontWeight={501} mt={3}>
            Please <AuthRedirectBtn /> in to access the dashboard walkthrough.
          </Typography>
        </Card>
      </Box>
    );
  }

  return (
    <Box maxWidth={1000} mx={'auto'}>
      <Card sx={{ p: 3, my: 5}}>
        <Stack gap={1} p={1}>
          <h3>Complete Dashboard Walkthrough</h3>
          <Divider sx={{ mb: 2 }} />

          <Typography>
            The TicTask Dashboard is the command center of your workspace — where you manage tickets, collaborate with your team and access core product features.
          </Typography> 
          <Typography fontWeight={501} my={1} letterSpacing={0.25}>
            Your first visit to the dashboard may feel complex; This guide will help you understand its structure and functionality.
          </Typography>
        </Stack>

        <Box 
          my={2} 
          px={3} 
          py={2}
          gap={1}
          sx={{
            boxShadow: 1,
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
          display={'flex'}
          flexDirection={'column'}
        >
          <BannerDisplay>
            <Typography variant='subtitle2'>
              To systematically explore the dashboard, let&apos;s start from top to bottom, as it is visually structured into 3 primary areas.
            </Typography>
          </BannerDisplay>

          <AccordionDisplay
            title="Dashboard Header"
            subtitle='Quick access navigation, profile, notifications, and other self-service actions.'
            content={
              <>
                <Typography>
                  On the top-right corner, you will find two key elements: <strong>User Profile block</strong> and <strong>Notification bell</strong> icon.
                </Typography>
                <Typography>
                  <span>The User Profile block gives you quick access to your</span>
                  <ul style={{ margin: '10px 15px 0', lineHeight: 2}}>
                    <li>Profile actions - click to view profile. Hovering around shows acccount type i.e. personal or business</li>
                    <li>Mute notifications - allow you to quiet your workspace and affects how you receive notifications.</li>
                    <li>Set status - allow you to set your availability so that team members know when you are available.</li>
                    <li>External links - allow you to access external resources such as videos, pricing, main page, and support.</li>
                    <li>Logout - allow you to sign out of your account.</li>
                  </ul>
                </Typography>

                <Typography>
                  <span>The Notification bell icon alerts you to new updates, mentions, or system messages.
                  <br/>It only shows the most recent notifications at a glance. Go to <strong>Manage Feed</strong> to view all notifications.</span>
                </Typography>

                <Typography> To the extreme left (top-left), you will find the Logo Icon. Clicking on this icon will take you to the dashboard home page.</Typography>
              </>
            }
          />

          <AccordionDisplay
            title="System Pages"
            subtitle='Tickets, Teams, Settings and other private pages that require authentication.'
            content={
              <>
                <Typography>
                  The system pages are the core functional areas of TicTask.  
                  They include:
                </Typography>
                <ul style={{ margin: '5px 15px 0', lineHeight: 2 }}>
                  <li><strong>Tickets</strong> <br/> 
                    <span className="font-2xs">This is the main page where you can view, create, and manage all your (personal) tickets. This page offers a comprehensive overview of your ticket and tasks with board and list views. Learn more about tickets from the <strong>What is a ticket?</strong> section.</span>
                  </li>
                  <li><strong>Teams</strong> <br/>
                    <span className="font-2xs">Appear top of the menu stack when you have joined or created a team. In teams you can find team-specific tickets, tasks and collaborate with members. Learn more about teams from the <strong>What is a team?</strong> section</span>
                  </li>
                  <li><strong>Task Manager</strong><br/>
                    <span className="font-2xs">This is a timeline-based scheduling view. It&apos;s perfect for arranging work across days, weeks, or months. It is similar to Tickets Hub with a specific focus on time-based tickets, and an optional list view (exactly as Ticket Hub).</span>
                  </li>
                  <li><strong>Subscription</strong><br/>
                    <span className="font-2xs">This is where you manage your billing, view history and extend workspace plans i.e. Pro, Standard & Enterprise (Organization only). Subscription unlock additional features and raise limits, especially for business accounts.</span>
                  </li>
                  <li><strong>Settings</strong><br/>
                    <span className="font-2xs">Manage your Appearance, Account information, Notifications, Workspace Security and Integration settings. You can find more user-specific and system-wide preferences here as updates are released on a monthly basis.</span>
                  </li>
                  <li><strong>Invite</strong><br/>
                    <span className="font-2xs">Invite new members to TicTask. This also allows you team invites you haven&apos;t accepted yet; However, to invite someone to your team, go to the team from <strong>Teams</strong> page and navigate to Invite Member section and continue.</span>
                  </li>
                  <li><strong>External Links</strong> <br/>
                    <span className="font-2xs">You can find other key links to useful resources such as Product, Legal, Docs, FAQ, Blog, Reviews and a direct link to Sign Up page.</span>
                  </li>
                </ul>
                <Typography>
                  Each page is designed to help you manage specific aspects of your workspace.
                </Typography>
              </>
            }
          />

          <AccordionDisplay
            title="Page View"
            subtitle='Display selected page(s) in full width, sidebar, or drop modal based on device.'
            content={
              <>
                <Typography>
                  The Page View is the main content area where selected pages are displayed.  
                  Depending on your device and screen size, pages may appear in full width, sidebar, or drop modal.
                </Typography>
                <Typography>
                  This area is dynamic and changes based on your navigation and interactions with the dashboard.
                </Typography>
              </>
            }
          />

          <br/>
          <BannerDisplay>
            <Typography fontSize={15} variant='h6' sx={{ opacity: 0.8 }}>
              Now that we have covered the dashboard structure, let&apos;s explore initial system setups.
            </Typography>
          </BannerDisplay>

          <AccordionDisplay
            title="Why use TicTask?"
            content={
              <>
                <Typography lineHeight={2}>
                  Designed to streamline your workflow, enhance team collaboration, and provide a centralized platform for task management. With a range of features that offer:
                  <br/> —  Organization
                  <br/> —  Time Management
                  <br/> —  Efficiency & Productivity 
                  <br/> —  Teamwork & Collaboration
                  <br/> —  Bookkeeping, History & Reporting
                </Typography>
              </>
            }
          />

          <AccordionDisplay
            title="Who uses TicTask?"
            content={
              <>
                <ul style={{ margin: '10px 15px 0', lineHeight: 2}}>
                  <li> Individual / Personal</li>
                  <li> Organizations / Business</li>
                </ul>

                <Typography> Individual accounts are perfect for individuals a part of a workforce and can also represent personal task management. 
                  <br/>
                  Having an individual account means you have a dedicated space to organize your tasks and collaborate with others. Based on our system, 5 out of 6 users are individuals who use TicTask for personal task management and collaboration.
                </Typography>
                <Typography>
                  Organizations and business accounts are designed for teams and companies. They provide additional features such as team management, advanced reporting, and enhanced collaboration tools that implement a workflow for the workforce.
                  <br/>
                  Having an organization account means you are a team owner/ manager responsible for a workforce.  
                </Typography>
                <Typography>
                  Whether you are an individual looking to manage your tasks or a business seeking to enhance team productivity, TicTask offers the tools and features to meet your needs.
                </Typography>
              </>
            }
          />

          <AccordionDisplay
            title='How to use TicTask?'
            content={
              <>
                <ol style={{ margin: '0 10px',}}>
                  <li>
                    <Typography variant='body1' letterSpacing={1.5}>Platform</Typography>
                  </li>
                  <ul style={{ margin: '10px 15px', lineHeight: 2 }}>
                    <li> Browser (Web app)</li>
                    <li><span style={{ opacity: 0.5 }}>Mobile Application</span></li>
                  </ul>
                  <Typography> TicTask is primarily built on the web, which means it can run on any device with access to an internet, and a browser.</Typography>
                  
                  <li style={{ margin: '15px 0 0'}}>
                    <Typography variant='body1' letterSpacing={1.5}>Device</Typography>
                  </li>

                  <ul style={{ margin: '10px 15px', lineHeight: 2 }}>
                    <li> Mobile </li>
                    <li> Tabs & Tablets</li>
                    <li> Computer & Larger Screens</li>
                  </ul>
                  <Typography>
                    TicTask is built with every device (category) in mind. Generally, larger screens are recommended for work; however, responsiveness matters most to us; to give the best interface and experience to every user despite the device used.
                  </Typography>

                  <li style={{ margin: '15px 0'}}>
                    <Typography variant='body1' letterSpacing={1.5}>User Flow</Typography>
                  </li>
                  <Typography>
                    Every TicTask user must also have access to a <strong>valid email</strong>; Used for signing up, onboarding, and subsequent secure authorization-based actions. More integrations are also supported as workflow deepens and other tools are needed. 
                  </Typography>

                  <br/>
                  <Typography fontWeight={600}>
                    Post sign-up
                  </Typography>

                  <br/>
                  <Typography>
                    After verifying your email and providing account details during sign-up, you&apos;d have finished onboarding (when redirected to dashboard), but not completely setup for an active workflow.
                    <br/><br/>
                    To practically setup your workspace, workflow & workforce, there are personal and professional preferences required.           
                  </Typography>

                  <Box mt={2}>
                    <ul style={{ margin: '10px 15px', lineHeight: 2 }}>
                      <Chip label="WORKSPACE" sx={{ fontSize: 12, fontWeight: 501, letterSpacing: 1.5, mb: 1 }} />
                      <li> <strong>Profile ⎯ </strong> start by confirming your details (edit where necessary and save), see account information and other key detail you may need later on from <Link href={'/dashboard/profile'} className='bold'>profile </Link>.</li>
                      <li> <strong>Workspace Name ⎯ </strong> set a unique workspace name in <Link href={'/dashboard/settings#workspace'} className='bold'>settings</Link>. Can be useful in a team or shared workspace. Defaults to user name or ID number when unset.</li>
                      <li> <strong>Appearance ⎯ </strong> set your preferred dashboard display with light, dark or system (auto) modes in <Link href={'/dashboard/settings#appearance'} className='bold'>settings</Link>.</li>
                      
                      <Chip label="WORKFLOW" sx={{ fontSize: 12, fontWeight: 501, letterSpacing: 1.5, mb: 1, mt: 2 }} />
                      <li> <strong>Ticket Updates ⎯ </strong>define how you receive ticket notifications in <Link href={'/dashboard/settings#notifications'} className='bold'>settings</Link>. Emails and in-app updates by default; Push can be activated with a paid plan (see setup guide below).</li>
                      <li> <strong>Mute Notifications ⎯ </strong>quiets your workspace and rids you of unwanted notifications; affects how you receive personal and team-specific emails and push. Always remember to reset when the mood changes.</li>
                      <li> <strong>Set Status ⎯ </strong>allow team members see your availability in real time. Crucial for collaboration.</li>

                      <Chip label="WORKFORCE (ORG)" sx={{ fontSize: 12, fontWeight: 501, letterSpacing: 1.5, mb: 1, mt: 2 }} />
                      <li> <strong>Subscription ⎯ </strong>unlock core features with an organization account, from <Link href={'/dashboard/subscription'} className='bold'>subscription</Link>. Gives you access to teams, metrics, reporting and integrations (Enterprise). PS: Individual accounts can access free trials for 14 days.</li>
                      <li> <strong>Teams ⎯ </strong> after purchasing a paid plan, carefully setup your <Link href={'/dashboard/teams'} className='bold'>team(s)</Link> and their respective workspace & workflow. Add members who are registered on TicTask, or invite non-members via referral code or <Link href={'/dashboard/invite'} className='bold'>invite</Link> page</li>
                      <li> <strong>Members ⎯ </strong>users added or invited to a team must access invitations via the registered email. Secure tokens are used to create and authenticate team invites.</li>
                    </ul>

                    <Typography>Other TicTask use cases (outside dashboard) include Blogs, FAQs and Reviews. Technical prospects can also explore open-source opportunities.</Typography>
                  </Box>
                  
                  <section id='setup-push-notifications-on-iPhone'>
                    <Stack mt={2} gap={2}>
                      <Typography variant='h6' fontWeight={600}>Steps to Receive Push Notifications (2026)</Typography>
                      <Typography>To help users set up push notifications on their iPhones, we have provided them with these exact, step-by-step instructions:</Typography>
                      
                      <ul style={{ margin: '0 15px', lineHeight: 2 }}>
                        <li>Open in Safari: Launch the iPhone Safari browser and go to your web app's URL. (Note: Other browsers like Chrome or Firefox on iOS do not currently support the "Add to Home Screen" feature for push notifications).</li>
                        <li>Add to Home Screen: Tap the Share button (the square icon with an arrow pointing up at the bottom of the screen), scroll down, and select Add to Home Screen.</li>
                        <li>Launch the App: Go to the iPhone home screen and tap the newly created app icon to open it.</li>
                        <li>Trigger the Prompt: Inside the newly opened app, tap your app's built-in "Enable Notifications" or "Subscribe" button.</li>
                        <li>Allow Permissions: Tap Allow when the official iOS system prompt asks for permission to send notifications.</li>
                      </ul>
                    </Stack>
                  </section>
                </ol>
              </>
            }
          />

          <br/>
          <BannerDisplay>
            <Typography fontSize={15} variant='h6' sx={{ opacity: 0.8 }}>
              Initial Setups Completed. Now we can explore each system feature in detail.
            </Typography>
          </BannerDisplay>

          {/* ============================= */}
          {/*    TICKETS OVERVIEW           */}
          {/* ============================= */}
          <Box>
            <Typography alignItems={'center'} gap={2} display={'flex'} variant="h6" fontWeight={501} mt={4} mb={1}><FcSerialTasks/> Tickets Overview</Typography>
            <Typography mb={2}>
              Tickets are the core of TicTask. Each task, issue, or workflow item is represented as a ticket.  
              You can manage them in two main views:
            </Typography>

            <Typography component={'button'} sx={{ bgcolor: 'inherit', borderRadius: 999, color: 'inherit'}} px={1} my={1} fontWeight={501}>Board View</Typography>
            <Typography>
              The <strong>Board</strong> gives you a visual, kanban-style workflow. Tickets are organized into status columns, and you can drag-and-drop cards to update their status.
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

            <Typography component={'button'} sx={{ bgcolor: 'inherit', borderRadius: 999, color: 'inherit'}} px={1} my={1} fontWeight={501}>List View</Typography>
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
              <li>Created (Created at)</li>
              <li>Created By</li>
              <li> Updated (updated at) </li>
              <li>Started By (Teams-specific field)</li>
              <li>Closed By (Teams-specific field)</li>
            </ul>
          </Box>
          
          {/* ============================= */}
          {/*    AI ASSISTANT               */}
          {/* ============================= */}
          {/* 
          <Typography alignItems={'center'} gap={2} display={'flex'} variant="h6" fontWeight={501} mt={4} mb={1}><RiRobot2Fill /> AI Assistant</Typography>
          <Typography>
            The <strong>AI Page</strong> is your intelligent co-pilot.  
            Use it to quickly generate tasks, summarize long tickets, automate repetitive updates, and get data-driven suggestions.
          </Typography> 
          */}

          <Typography mt={1}>AI can help you:</Typography>
          <ul style={{ margin: '10px 15px 0', lineHeight: 2}}>
            <li>Create tickets from natural language</li>
            <li>Summarize or rewrite existing tickets</li>
            <li>Suggest next steps based on workload</li>
            <li>Analyze tasks and provide optimization tips</li>
          </ul>

          {/* ============================= */}
          {/*  TASK MANAGER                 */}
          {/* ============================= */}
          <Typography alignItems={'center'} gap={2} display={'flex'} variant="h6" fontWeight={501} mt={4} mb={1}><BsCalendar2Date/> Planner</Typography>
          <Typography>
            The <strong>Planner/ Task Manager</strong> provides a timeline-based scheduling view.  
            It&apos;s perfect for arranging work across days, weeks, or months.
          </Typography>
          <ul style={{ margin: '10px 15px 0', lineHeight: 2}}>
            <li>Drag-and-drop tasks to adjust schedules</li>
            <li>See upcoming tasks on a timeline</li>
            <li>Manage sprints, cycles, and deadlines</li>
            <li>Filter tasks by user, priority, or date</li>
          </ul>

          {/* ============================= */}
          {/*    TEAMS PAGE                 */}
          {/* ============================= */}
          <Typography alignItems={'center'} gap={2} display={'flex'} variant="h6" fontWeight={501} mt={4} mb={1}><FcOrganization /> Teams</Typography>
          <Typography>
            The <strong>Teams Page</strong> manages your teams and all workspace members.  
            From here, you can adjust access, roles, and collaboration settings.
          </Typography>
          <ul style={{ margin: '10px 15px 0', lineHeight: 2}}>
            <li>Add/remove members</li>
            <li>Assign roles: Admin, Manager, Member</li>
            <li>View workload per member</li>
            <li>Review activity and performance</li>
          </ul>

          {/* ============================= */}
          {/*    SUBSCRIPTION PAGE          */}
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
          {/*    INVITE PAGE                */}
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
        </Box>

        <Typography mt={4}>
          This completes the full dashboard walkthrough.  
          Each section helps you structure your workflow and operate efficiently inside TicTask.
        </Typography>
      </Card>
    </Box>
  )
}

export default Page