import { TbStatusChange } from "react-icons/tb";
import { MdNotificationsActive } from "react-icons/md";
import { Badge, Box, Container, Stack, Typography } from '@mui/material';

const pitchpoints = [
  {
    icon: "15+",
    title: "Use Cases",
    description: "Create Ticket as Task, Issue, Invoice & more",
    color: "gray"
  },
  {
    icon: <TbStatusChange />,
    title: "Track Ticket Status",
    description: "Track ticket status. Update or assign tickets to TikTask agent, bot or external receipient",
    color: "darkorange",
  },
  {
    icon: <MdNotificationsActive />,
    title: "Push Notifications",
    description: "Get ticket updates via Email, SMS or Slack",
    color: "gray",
  },
]

const IndexPitch = () => {
  return (
    <Container>
      <Stack textAlign={'center'} display={'grid'} gap={5}>
        <Typography variant='h5' fontWeight={501}>
          Never miss a task, routine or opportunity to get your {' '}
          <span className='custom-dull font-md'><strong>$</strong></span>hit together
        </Typography>
        <Box 
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={3}
          flexWrap={'wrap'}
        >
          { pitchpoints.map((point, index) => (
            <Box 
              key={index} 
              sx={{
                border: `2px solid ${point.color}`, 
                borderRadius: '8px', 
                padding: '16px', 
                textAlign: 'center', 
                flex: 1,
                minWidth: 200
              }}
            >
              <Badge sx={{fontSize: 36, color: point.color, fontWeight: 700}}>
                {point.icon}
              </Badge>
              <Stack gap={1} py={1}>
                <h6 style={{margin: '8px 0'}}>{point.title}</h6>
                <p className="custom-bw">{point.description}</p>
              </Stack>
            </Box>
          ))}
        </Box>
      </Stack>
    </Container>
  )
}

export default IndexPitch
