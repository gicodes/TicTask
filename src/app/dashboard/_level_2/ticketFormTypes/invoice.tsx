import { Stack, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

const InvoiceForm = ({ 
  control 
}: { control: Control}
  ) => {
    return (
      <Stack spacing={2} mt={2}>
        <Controller 
          name="title" 
          control={control}
          render={({ field }) => 
            <TextField 
              label="Invoice Title" 
              required {...field} 
            />
          } 
        />
        <Controller 
          name="amount" 
          control={control}
          render={({ field }) => 
            <TextField 
              type="number" 
              label="Amount" 
              required {...field} 
            />
          } 
        />
        <Controller 
          name="currency" 
          control={control}
          render={({ field }) => 
            <TextField 
              label="Currency" 
              {...field} 
            />
          } 
        />
        <Controller 
          name="description" 
          control={control}
          render={({ field }) => 
            <TextField 
            label="Description" 
            multiline minRows={2} 
            {...field} 
          />
        }
      />
      </Stack>
    );
  }

  export default InvoiceForm