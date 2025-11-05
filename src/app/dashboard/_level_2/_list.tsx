import React from 'react';
import { Ticket } from '@/types/ticket';
import { Box, Chip } from '@mui/material';
import { getStatusColor, priorityColor } from '../_level_1/tColorVariants';

const TicketsList = ({
  tickets,
  openDetail,
}: {
  tickets: Ticket[];
  openDetail: (id: string | number) => void;
}) => {
  if (tickets?.length===0) return <Box textAlign={'center'} py={12}>No tickets found</Box>

  return (
    <Box py={3} px={2} maxWidth={'96vw'}>
      <Box
        sx={{
          my: 3,
          width: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
          borderRadius: 2,
          border: '0.1px solid var(--dull-gray)',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'thin',
          scrollBehavior: 'smooth',

          '&::-webkit-scrollbar': {
            height: 6,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--secondary)',
            borderRadius: 10,
          },
          '@media (max-width: 600px)': {
            display: 'block',
            maxWidth: '90vw',
          },
        }}
      >
        <Box
          component="table"
          sx={{
            minWidth: 750,
            width: '100%',
            borderCollapse: 'collapse',
            tableLayout: 'auto',
          }}
        >
          <thead style={{ textAlign: 'left' }}>
            <tr>
              {['No.', 'Title', 'Priority','Status',  'Type', 'Due Date', 'Last Updated'].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: '10px 12px',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                    position: 'sticky',
                    top: 0,
                    background: 'var(--primary)',
                    color: 'var(--primary)',
                    borderBottom: '1px solid var(--secondary)',
                    zIndex: 1,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {tickets.map((t, i) => (
              <tr
                key={t.id}
                style={{
                  borderBottom: '0.1px solid var(--secondary)',
                  transition: 'background 0.2s',
                  cursor: 'pointer',
                  height: '60px',
                }}
                onClick={() => openDetail(t.id)}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>
                  {i+1}.
                </td>

                <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>
                  {t.title}
                </td>

                <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>
                  <Chip
                    label={t.priority}
                    size="small"
                    sx={{
                      backgroundColor: priorityColor(t.priority),
                      color: 'white',
                      fontWeight: 600,
                      borderRadius: '8px',
                      textTransform: 'capitalize',
                    }}
                  />
                </td>

                <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>
                  <Chip
                    label={t.status==="IN_PROGRESS" ? "IN PROGRESS" : t.status}
                    size="small"
                    sx={{
                      backgroundColor: getStatusColor(t.status).bg,
                      color: getStatusColor(t.status).color,
                      fontWeight: 600,
                      borderRadius: '8px',
                      textTransform: 'capitalize',
                    }}
                  />
                </td>

                <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>
                  {t.type==='FEATURE_REQUEST' ? 'FEATURE' : t.type}
                </td>

                <td style={{ padding: '0 10px', whiteSpace: 'nowrap', }}>
                  {t.dueDate ? 
                    new Date().toLocaleDateString()>new Date(t.dueDate).toLocaleDateString() 
                      ? <span className='custom-dull'>{new Date(t.dueDate).toDateString()}</span>
                      :
                    (new Date().toLocaleDateString()===new Date(t.dueDate).toLocaleDateString() 
                      ? <strong className='font-xxs'>‼️ Due Today ‼️</strong> 
                      : new Date(t.dueDate).toDateString()): '-----'}
                </td>

                <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>
                  {t.updatedAt
                    ? new Date(t.updatedAt).toLocaleString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      }).replace(' ', ' ') 
                    : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </Box>
      </Box>
    </Box>
  );
};

export default TicketsList;
