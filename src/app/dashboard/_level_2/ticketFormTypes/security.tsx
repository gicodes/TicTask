import GeneralForm, { GeneralFormProps } from "./general";

const SecurityForm = ({ control, type = 'SECURITY' }: GeneralFormProps) => {
  return (
    <GeneralForm 
      control={control}
      type={type}
    />
  )
}

export default SecurityForm;