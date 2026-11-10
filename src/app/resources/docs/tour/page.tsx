
'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/providers/auth';
import AuthRedirectBtn from '@/assets/authRedirectBtn';
import { FeatureSection, TourSidebar } from '../../_level_2/tourResources';
import AccordionDisplay, { BannerDisplay } from '../../_level_2/tourAccordion';
import {
  Box,
  Card,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

function Page() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Box maxWidth={1000} mx="auto" textAlign="center">
        <Typography variant="h6" mt={3}>
          Please <AuthRedirectBtn /> in to access the dashboard walkthrough.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      mx="auto"
      maxWidth={1400}
      py={{ xs: 2, md: 4 }}
      px={{ xs: 1.5, sm: 2, md: 3 }}
    >
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: 'minmax(0, 1fr)',
          lg: '240px minmax(0, 1fr)',
        }}
        gap={{ xs: 2, md: 3 }}
        alignItems="start"
      >
        <TourSidebar />

        <Card
          sx={{
            minWidth: 0,
            p: { xs: 1.5, sm: 2.5, md: 3 },
            borderRadius: 3,
            color: 'var(--foreground)',
            bgcolor: 'var(--background)',
          }}
        >
          <Stack spacing={2}>
            <Box>
              <Typography
                variant="h5"
                fontWeight={700}
                letterSpacing={-0.5}
              >
                Complete Dashboard Walkthrough
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography color="text.secondary" lineHeight={1.9}>
                The TicTask Dashboard is the command center of your
                workspace, where you manage tickets, collaborate with
                your team, and access core product features.
              </Typography>

              <Typography fontWeight={500} mt={1}>
                Your first visit to the dashboard may feel complex.
                This guide will help you understand its structure and
                functionality.
              </Typography>
            </Box>

            <BannerDisplay>
              <Typography variant="subtitle2">
                To systematically explore the dashboard, let's start
                from top to bottom. The dashboard is visually structured
                into three primary areas.
              </Typography>
            </BannerDisplay>

            <Box
              component="section"
              id="dashboard-overview"
              sx={{ scrollMarginTop: 24 }}
            >
              <Typography variant="h6" fontWeight={700} mb={1}>
                Dashboard Overview
              </Typography>

              <AccordionDisplay
                title="Dashboard Header"
                subtitle="Quick access to navigation, your profile, notifications, and other self-service actions."
                content={
                  <>
                    <Typography>
                      On the top-right corner, you will find two key
                      elements: the <strong>User Profile block</strong>
                      and the <strong>Notification bell</strong>.
                    </Typography>

                    <Typography mt={1}>
                      The User Profile block gives you quick access to:
                    </Typography>

                    <ul style={{ margin: '8px 15px', lineHeight: 2 }}>
                      <li>
                        <strong>Profile:</strong> View and manage your
                        profile.
                      </li>
                      <li>
                        <strong>Account type:</strong> View whether
                        your account is personal or business.
                      </li>
                      <li>
                        <strong>Mute notifications:</strong> Quiet your
                        workspace and control notification delivery.
                      </li>
                      <li>
                        <strong>Set status:</strong> Let team members
                        know your availability.
                      </li>
                      <li>
                        <strong>External links:</strong> Access useful
                        resources such as videos, pricing, the main
                        page, and support.
                      </li>
                      <li>
                        <strong>Logout:</strong> Sign out of your account.
                      </li>
                    </ul>

                    <Typography mt={1}>
                      The Notification bell alerts you to new updates,
                      mentions, and system messages. It displays recent
                      notifications at a glance. Visit{' '}
                      <strong>Manage Feed</strong> to view all
                      notifications.
                    </Typography>

                    <Typography mt={1}>
                      On the top-left, you will find the Logo Icon.
                      Clicking it takes you to the dashboard home page.
                    </Typography>
                  </>
                }
              />

              <AccordionDisplay
                title="System Pages"
                subtitle="Tickets, Teams, Settings, and other private pages requiring authentication."
                content={
                  <>
                    <Typography>
                      System pages are the core functional areas of
                      TicTask. They include:
                    </Typography>

                    <ul style={{ margin: '8px 15px', lineHeight: 2 }}>
                      <li>
                        <strong>Tickets:</strong> View, create, and
                        manage personal tickets through board and list
                        views.
                      </li>
                      <li>
                        <strong>Teams:</strong> Access team-specific
                        tickets, tasks, and collaboration spaces.
                      </li>
                      <li>
                        <strong>Task Manager:</strong> A timeline-based
                        scheduling view for arranging work across days,
                        weeks, or months.
                      </li>
                      <li>
                        <strong>Subscription:</strong> Manage billing,
                        view subscription history, and extend workspace
                        plans such as Pro, Standard, and Enterprise.
                      </li>
                      <li>
                        <strong>Settings:</strong> Manage appearance,
                        account information, notifications, workspace
                        security, and integrations.
                      </li>
                      <li>
                        <strong>Invite:</strong> Invite new members to
                        TicTask and access pending team invitations.
                        To invite someone to a team, visit the Teams
                        page and navigate to Invite Member.
                      </li>
                      <li>
                        <strong>External Links:</strong> Access Product,
                        Legal, Docs, FAQ, Blog, Reviews, and the Sign Up
                        page.
                      </li>
                    </ul>

                    <Typography>
                      Each page is designed to help you manage a
                      specific aspect of your workspace.
                    </Typography>
                  </>
                }
              />

              <AccordionDisplay
                title="Page View"
                subtitle="Display selected pages in full width, sidebar, or drop modal based on your device."
                content={
                  <>
                    <Typography>
                      The Page View is the main content area where
                      selected pages are displayed. Depending on your
                      device and screen size, pages may appear in full
                      width, sidebar, or drop modal.
                    </Typography>

                    <Typography mt={1}>
                      This area is dynamic and changes based on your
                      navigation and interactions with the dashboard.
                    </Typography>
                  </>
                }
              />
            </Box>

            <Box
              component="section"
              id="initial-setup"
              sx={{ scrollMarginTop: 24 }}
            >
              <BannerDisplay>
                <Typography variant="h6" fontSize={15}>
                  Now that we have covered the dashboard structure,
                  let's explore the initial system setup.
                </Typography>
              </BannerDisplay>

              <AccordionDisplay
                title="Why use TicTask?"
                content={
                  <Typography lineHeight={2}>
                    TicTask is designed to streamline your workflow,
                    enhance team collaboration, and provide a centralized
                    platform for task management. Its features support:
                    <br />— Organization
                    <br />— Time Management
                    <br />— Efficiency and Productivity
                    <br />— Teamwork and Collaboration
                    <br />— Bookkeeping, History, and Reporting
                  </Typography>
                }
              />

              <AccordionDisplay
                title="Who uses TicTask?"
                content={
                  <>
                    <ul style={{ margin: '8px 15px', lineHeight: 2 }}>
                      <li>Individual / Personal accounts</li>
                      <li>Organizations / Business accounts</li>
                    </ul>

                    <Typography>
                      Individual accounts are suitable for people who
                      want to manage personal tasks or participate in
                      a workforce. They provide a dedicated space to
                      organize tasks and collaborate with others.
                    </Typography>

                    <Typography mt={1}>
                      Organizations and business accounts are designed
                      for teams and companies. They provide additional
                      features such as team management, advanced
                      reporting, and enhanced collaboration tools.
                    </Typography>

                    <Typography mt={1}>
                      An organization account is intended for a team
                      owner or manager responsible for a workforce.
                    </Typography>

                    <Typography mt={1}>
                      Whether you are managing personal tasks or
                      coordinating a business workforce, TicTask
                      provides tools to support your workflow.
                    </Typography>
                  </>
                }
              />

              <AccordionDisplay
                title="How to use TicTask"
                content={
                  <>
                    <Typography fontWeight={600}>
                      1. Platform
                    </Typography>

                    <ul style={{ margin: '8px 15px', lineHeight: 2 }}>
                      <li>Browser (Web app)</li>
                      <li>Mobile Application</li>
                    </ul>

                    <Typography>
                      TicTask is primarily built for the web and can
                      run on devices with internet access and a
                      supported browser.
                    </Typography>

                    <Typography fontWeight={600} mt={2}>
                      2. Device
                    </Typography>

                    <ul style={{ margin: '8px 15px', lineHeight: 2 }}>
                      <li>Mobile phones</li>
                      <li>Tabs and tablets</li>
                      <li>Computers and larger screens</li>
                    </ul>

                    <Typography>
                      TicTask is designed with different device
                      categories in mind. Larger screens are generally
                      recommended for work, while responsive layouts
                      help provide a consistent experience across
                      devices.
                    </Typography>

                    <Typography fontWeight={600} mt={2}>
                      3. User Flow
                    </Typography>

                    <Typography mt={1}>
                      Every TicTask user needs access to a valid email
                      address for registration, onboarding, and
                      subsequent authorization-based actions.
                    </Typography>

                    <Typography fontWeight={600} mt={2}>
                      Post Sign-up
                    </Typography>

                    <Typography mt={1}>
                      After verifying your email and providing the
                      required account details, you complete onboarding
                      when redirected to the dashboard. However, some
                      additional preferences may be needed before
                      establishing an active workflow.
                    </Typography>

                    <Box mt={2}>
                      <Chip
                        label="WORKSPACE"
                        size="small"
                        sx={{ mb: 1, fontWeight: 600 }}
                      />

                      <ul style={{ margin: '0 15px', lineHeight: 2 }}>
                        <li>
                          <strong>Profile:</strong> Confirm your details
                          and save any necessary changes from{' '}
                          <Link href="/dashboard/profile">
                            Profile
                          </Link>.
                        </li>
                        <li>
                          <strong>Workspace Name:</strong> Set a unique
                          workspace name in{' '}
                          <Link href="/dashboard/settings#workspace">
                            Settings
                          </Link>. This is useful in a team or shared
                          workspace. If unset, the default is the user
                          name or ID number.
                        </li>
                        <li>
                          <strong>Appearance:</strong> Choose light,
                          dark, or system mode in{' '}
                          <Link href="/dashboard/settings#appearance">
                            Settings
                          </Link>.
                        </li>
                      </ul>

                      <Chip
                        label="WORKFLOW"
                        size="small"
                        sx={{ my: 1, fontWeight: 600 }}
                      />

                      <ul style={{ margin: '0 15px', lineHeight: 2 }}>
                        <li>
                          <strong>Ticket Updates:</strong> Define how
                          you receive ticket notifications in{' '}
                          <Link href="/dashboard/settings#notifications">
                            Settings
                          </Link>. Email and in-app updates are
                          available by default; push notifications
                          can be activated with a paid plan.
                        </li>
                        <li>
                          <strong>Mute Notifications:</strong> Quiet
                          your workspace and control personal and
                          team-specific email and push notifications.
                          Remember to reset this preference when needed.
                        </li>
                        <li>
                          <strong>Set Status:</strong> Let team members
                          see your availability.
                        </li>
                      </ul>

                      <Chip
                        label="WORKFORCE (ORG)"
                        size="small"
                        sx={{ my: 1, fontWeight: 600 }}
                      />

                      <ul style={{ margin: '0 15px', lineHeight: 2 }}>
                        <li>
                          <strong>Subscription:</strong> Access
                          organization features through{' '}
                          <Link href="/dashboard/subscription">
                            Subscription
                          </Link>. Depending on your plan, these
                          include teams, metrics, reporting, and
                          Enterprise integrations. Individual accounts
                          can access free trials for 14 days.
                        </li>
                        <li>
                          <strong>Teams:</strong> Set up your{' '}
                          <Link href="/dashboard/teams">Teams</Link>{' '}
                          and their respective workspaces and workflows.
                          Add registered TicTask users or invite
                          non-members through the{' '}
                          <Link href="/dashboard/invite">Invite</Link>{' '}
                          page.
                        </li>
                        <li>
                          <strong>Members:</strong> Users added or
                          invited to a team must access invitations
                          through their registered email. Secure
                          tokens are used to create and authenticate
                          team invitations.
                        </li>
                      </ul>
                    </Box>

                    <Typography mt={2}>
                      Other TicTask resources outside the dashboard
                      include Blogs, FAQs, and Reviews. Technical
                      prospects can also explore open-source
                      opportunities.
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Box
                      component="section"
                      id="setup-push-notifications-on-iphone"
                      sx={{ scrollMarginTop: 24 }}
                    >
                      <Typography variant="h6" fontWeight={600}>
                        Setting up Push Notifications on iPhone
                      </Typography>

                      <Typography mt={1}>
                        Follow these steps to set up push notifications
                        on an iPhone:
                      </Typography>

                      <ol style={{ margin: '8px 15px', lineHeight: 2 }}>
                        <li>
                          <strong>Open in Safari:</strong> Visit your
                          TicTask web app URL using Safari.
                        </li>
                        <li>
                          <strong>Add to Home Screen:</strong> Tap the
                          Share button, scroll down, and select Add to
                          Home Screen.
                        </li>
                        <li>
                          <strong>Launch the App:</strong> Open the
                          newly created app icon from your iPhone
                          home screen.
                        </li>
                        <li>
                          <strong>Trigger the Prompt:</strong> Inside
                          the app, tap the built-in Enable Notifications
                          or Subscribe button.
                        </li>
                        <li>
                          <strong>Allow Permissions:</strong> Select
                          Allow when iOS requests permission to send
                          notifications.
                        </li>
                      </ol>
                    </Box>
                  </>
                }
              />

              <BannerDisplay>
                <Typography variant="h6" fontSize={15}>
                  Initial setup completed. Now let's explore each
                  system feature in detail.
                </Typography>
              </BannerDisplay>
            </Box>

            <FeatureSection
              id="tickets-overview"
              title="Tickets Overview"
              subtitle="Create, organize, track, and manage tasks through board and list views."
              content={
                <>
                  <Typography>
                    Tickets are the core of TicTask. Each task, issue,
                    or workflow item is represented as a ticket.
                    You can manage them in two main views.
                  </Typography>

                  <Typography fontWeight={600} mt={2}>
                    Board View
                  </Typography>

                  <Typography mt={1}>
                    The Board provides a visual, Kanban-style workflow.
                    Tickets are organized into status columns, and you
                    can drag and drop cards to update their status.
                  </Typography>

                  <Typography fontWeight={600} mt={2}>
                    Default Workflow Columns
                  </Typography>

                  <ul style={{ margin: '8px 15px', lineHeight: 2 }}>
                    <li>Upcoming</li>
                    <li>Open</li>
                    <li>In Progress</li>
                    <li>Resolved</li>
                    <li>Closed</li>
                    <li>Cancelled</li>
                  </ul>

                  <Typography mt={1}>
                    Each column displays ticket cards containing details
                    such as title, priority, due date, assignee, and
                    quick actions.
                  </Typography>

                  <Typography fontWeight={600} mt={2}>
                    List View
                  </Typography>

                  <Typography mt={1}>
                    The List view displays tickets in a detailed table
                    layout. It is ideal for sorting, filtering, and
                    scanning large volumes of work.
                  </Typography>

                  <Typography fontWeight={600} mt={2}>
                    Typical Table Columns
                  </Typography>

                  <ul style={{ margin: '8px 15px', lineHeight: 2 }}>
                    <li>Title</li>
                    <li>Priority</li>
                    <li>Due Date</li>
                    <li>Status</li>
                    <li>Assignee</li>
                    <li>Created (Created at)</li>
                    <li>Created By</li>
                    <li>Updated (Updated at)</li>
                    <li>Started By (Teams-specific field)</li>
                    <li>Closed By (Teams-specific field)</li>
                  </ul>
                </>
              }
            />

            {/* AI Assistance is intentionally disabled until its feature documentation is ready. */}

            <FeatureSection
              id="teams"
              title="Teams"
              subtitle="Manage teams, members, and team-specific collaboration."
              content={
                <>
                  <Typography>
                    The Teams page manages your teams and workspace
                    members. From here, you can access team-specific
                    workspaces and collaboration features.
                  </Typography>

                  <ul style={{ margin: '8px 15px', lineHeight: 2 }}>
                    <li>Access team-specific tickets and tasks.</li>
                    <li>Manage team members.</li>
                    <li>Invite members through the Invite Member section.</li>
                    <li>Organize team workspaces and workflows.</li>
                  </ul>
                </>
              }
            />

            <FeatureSection
              id="task-manager"
              title="Task Manager"
              subtitle="Plan and organize work through a timeline-based scheduling view."
              content={
                <>
                  <Typography>
                    The <strong>Planner / Task Manager</strong> provides
                    a timeline-based scheduling view. It is designed
                    for arranging work across days, weeks, or months.
                  </Typography>

                  <ul style={{ margin: '8px 15px', lineHeight: 2 }}>
                    <li>Drag and drop tasks to adjust schedules.</li>
                    <li>View upcoming tasks on a timeline.</li>
                    <li>Manage sprints, cycles, and deadlines.</li>
                    <li>Filter tasks by user, priority, or date.</li>
                  </ul>
                </>
              }
            />

            <FeatureSection
              id="subscription"
              title="Subscription"
              subtitle="Manage billing, subscription history, and workspace plans."
              content={
                <>
                  <Typography>
                    The Subscription page allows you to manage your
                    workspace plan and review available subscription
                    options, including Pro, Standard, and Enterprise.
                  </Typography>

                  <Typography mt={1}>
                    Available subscription features and limits depend
                    on your account type and selected plan.
                  </Typography>

                  <Typography mt={1}>
                    Visit{' '}
                    <Link href="/dashboard/subscription">
                      Subscription
                    </Link>{' '}
                    to manage your plan and review its details.
                  </Typography>
                </>
              }
            />

            <FeatureSection
              id="metrics"
              title="Metrics"
              subtitle="Review insights into team performance and project health."
              content={
                <>
                  <Typography>
                    The Metrics page provides insights into team
                    performance and project health.
                  </Typography>

                  <ul style={{ margin: '8px 15px', lineHeight: 2 }}>
                    <li>Total tickets and workload distribution.</li>
                    <li>Completed versus pending statistics.</li>
                    <li>Average resolution time.</li>
                    <li>Trends over time.</li>
                    <li>Cycle progress indicators.</li>
                  </ul>
                </>
              }
            />

            <FeatureSection
              id="invite"
              title="Invite"
              subtitle="Invite new members and manage invitations."
              content={
                <>
                  <Typography>
                    The Invite page provides access to member
                    invitations and pending team invitations.
                    It helps you bring new users into TicTask.
                  </Typography>

                  <Typography mt={1}>
                    To invite someone to a specific team, navigate
                    to the Teams page, select the relevant team,
                    and use its Invite Member section.
                  </Typography>
                </>
              }
            />

            <FeatureSection
              id="notifications"
              title="Notifications"
              subtitle="Stay informed about updates, mentions, and workspace activity."
              content={
                <>
                  <Typography>
                    TicTask provides notifications through the
                    dashboard notification bell and Manage Feed.
                    The notification bell displays recent updates,
                    while Manage Feed provides access to your
                    notifications.
                  </Typography>

                  <Typography fontWeight={600} mt={2}>
                    Notification Preferences
                  </Typography>

                  <Typography mt={1}>
                    You can define how you receive ticket updates
                    through{' '}
                    <Link href="/dashboard/settings#notifications">
                      Settings
                    </Link>.
                    Email and in-app updates are available by default.
                    Push notifications can be activated with a
                    paid plan.
                  </Typography>

                  <Typography fontWeight={600} mt={2}>
                    Mute Notifications
                  </Typography>

                  <Typography mt={1}>
                    The Mute Notifications option quiets your workspace
                    and affects how you receive personal and
                    team-specific emails and push notifications.
                    Remember to reset this preference when needed.
                  </Typography>

                  <Typography fontWeight={600} mt={2}>
                    Push Notifications on iPhone
                  </Typography>

                  <Typography mt={1}>
                    Follow the{' '}
                    <Link href="#setup-push-notifications-on-iphone">
                      iPhone push notification setup guide
                    </Link>{' '}
                    in the Initial Setup section to enable notifications
                    on your device.
                  </Typography>
                </>
              }
            />

            <FeatureSection
              id="profile"
              title="Profile"
              subtitle="View your profile and manage your account details."
              content={
                <>
                  <Typography>
                    Your Profile page provides access to your
                    account information and personal details.
                    It is also where you can review and update
                    your details where necessary.
                  </Typography>

                  <Typography mt={1}>
                    You can access your profile from the dashboard
                    header or directly through the{' '}
                    <Link href="/dashboard/profile">
                      Profile page
                    </Link>.
                  </Typography>

                  <Typography fontWeight={600} mt={2}>
                    Profile and Availability
                  </Typography>

                  <Typography mt={1}>
                    Your dashboard profile block also provides
                    access to your account type, notification
                    controls, availability status, external links,
                    and logout action.
                  </Typography>
                </>
              }
            />

            <FeatureSection
              id="settings"
              title="Settings"
              subtitle="Manage personal preferences and workspace configuration."
              content={
                <>
                  <Typography>
                    The Settings page controls workspace and
                    personal configuration. It brings together
                    preferences that help you customize your
                    TicTask experience.
                  </Typography>

                  <ul style={{ margin: '8px 15px', lineHeight: 2 }}>
                    <li>
                      <strong>Workspace:</strong> Workspace name
                      and related preferences.
                    </li>
                    <li>
                      <strong>Notifications:</strong> Ticket updates
                      and notification preferences.
                    </li>
                    <li>
                      <strong>Appearance:</strong> Light, dark,
                      and system display modes.
                    </li>
                    <li>
                      <strong>Security:</strong> Workspace security
                      and authentication settings.
                    </li>
                    <li>
                      <strong>Integrations:</strong> Available
                      integration settings.
                    </li>
                  </ul>

                  <Typography mt={1}>
                    You can access Settings from the dashboard's
                    system navigation.
                  </Typography>
                </>
              }
            />

            <Divider sx={{ my: 2 }} />

            <Typography
              textAlign="center"
              color="text.secondary"
              lineHeight={1.8}
              fontSize={14}
            >
              This completes the TicTask dashboard walkthrough.
              Each section helps you understand and organize your
              workflow while making the most of your workspace.
            </Typography>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
};

export default Page;