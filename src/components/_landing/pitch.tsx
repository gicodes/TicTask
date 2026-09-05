import { TbStatusChange } from "react-icons/tb";
import { MdNotificationsActive } from "react-icons/md";
import { Badge, Box, Container, Stack, Typography } from '@mui/material';

const pitchpoints = [
  {
    icon: "10+",
    title: "Use Cases",
    description: "Create ticket as task, Issue, Invoice & more",
    color: "gray"
  },
  {
    icon: <TbStatusChange />,
    title: "Track Ticket Status",
    description: "See ticket status in real-time, update, start or assign to team",
    color: "darkorange",
  },
  {
    icon: <MdNotificationsActive />,
    title: "Push Notifications",
    description: "Get ticket updates via email or push",
    color: "gray",
  },
]

const IndexPitch = () => {
  return (
    <Container>
      <Stack textAlign={'center'} display={'grid'} gap={5}>
        <Typography
          variant="h4"
          fontWeight={700}
          fontFamily={'var(--font-sans)'}
          sx={{
            opacity: 0,
            animation: 'fadeIn 1.5s ease forwards',
          }}
        >
          Tickets that <span className="action-pulse">
            track itself
          </span> & {" "}
          <span className="pulse">
            facilitate work
          </span>
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
