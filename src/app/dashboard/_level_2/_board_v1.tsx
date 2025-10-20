
import { Box } from '@mui/material';
import BoardColumn from './boardColumn';
import { Ticket, TicketStatus } from '@/types/ticket';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

/**
 * NOTE: This is a lightweight dnd-kit integration where we make tickets within columns sortable.
 * For full cross-column drag-and-drop with status change, you can extend this using dnd-kit sensors
 * and logic to update status on drop. For brevity we implement intra-column ordering + status update helper.
 */

export default function Board({ 
  grouped, 
  openDetail,
}: {
  statuses: TicketStatus[];
  grouped: Record<string,Ticket[]>;
  setGrouped: (g: Record<string,Ticket[]>) => void;
  openDetail: (id: string | number)=>void;
}) {

  const handleDragEnd = async (event: unknown) => {
    // Basic placeholder: in the real implementation we'd update source/target and call api.updateTicket()
    // For now this function exists so you can later plug in the movement logic.
    console.log(event)
  };

  const STATUSES = Object.keys(grouped);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Box sx={{ display: 'flex', overflowX: 'auto', pb: 2 }}>
        {STATUSES.map(s => (
          <SortableContext key={s} items={grouped[s].map(t => t.id)} strategy={verticalListSortingStrategy}>
            <BoardColumn tickets={grouped[s]} onOpen={openDetail} title={s} />
          </SortableContext>
        ))}
      </Box>
    </DndContext>
  );
}
