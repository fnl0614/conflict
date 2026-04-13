import { FormControl, InputLabel, Input, InputAdornment, IconButton, FormHelperText } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import type { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface PasswordProps<T extends FieldValues>{
	register: UseFormRegister<T>;
	errors: FieldErrors<T>;
	showPassword: boolean;
	handleClickShowPassword: () => void;
	handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
	handleMouseUpPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
	label?: string;
	name: string;
}

const PasswordForm = <T extends FieldValues>({
	register,
	errors,
	showPassword,
	handleClickShowPassword,
	handleMouseDownPassword,
	handleMouseUpPassword,
	label,
	name,
}: PasswordProps<T>) => {
	const error = errors[name as keyof T];
	const errormessage = error?.message as string | undefined;

  return (
	<FormControl sx={{ mb: 2, width: '100%' }} variant="standard" error={!!errors.password} >
		<InputLabel htmlFor={name}>{label}</InputLabel>
			<Input
				id={name}
				fullWidth
				autoComplete="current-password"
				type={showPassword ? "text" : "password"}
				{...register(name as Path<T>, {
					required: "Field is required",
					minLength: { 
						value: 8,
						message: 'The field need at least 8 characters'
					},
					maxLength: { 
						value: 20,
						message: 'The field cannot exceed 20 characters'
					},
				})}
				endAdornment={
				<InputAdornment position="end">
					<IconButton
						aria-label={
							showPassword ? 'hide the password' : 'display the password'
						}
						onClick={handleClickShowPassword}
						onMouseDown={handleMouseDownPassword}
						onMouseUp={handleMouseUpPassword}
						edge="end"
					>
					{showPassword ? <Visibility /> : <VisibilityOff />}
					</IconButton>
				</InputAdornment>
				}
			/>
			<FormHelperText>
				{errormessage || " "}
			</FormHelperText>
	</FormControl>
)}

export default PasswordForm;

