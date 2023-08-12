import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

interface IYouTubeForm {
  username: string
  email: string
  channel: string
}

export default function YoutubeForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IYouTubeForm>({
    defaultValues: {
      username: 'Bruce Wayne',
      email: '',
      channel: '',
    },
  })

  const onSubmit = (data: IYouTubeForm) => {
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register('username', { required: 'Username is required' })} />
        <p className="error">{errors.username?.message}</p>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Invalid email format',
            },
            validate: {
              notAdmin: (value) => value !== 'admin@admin.com' || 'You cannot use email with admin@admin.com',
              notUser: (value) => !value.endsWith('baddomain.com') || "You can't use email ending with baddomain.com",
            },
          })}
        />
        <p className="error">{errors.email?.message}</p>

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register('channel', { required: 'Channel is required' })} />
        <p className="error">{errors.channel?.message}</p>

        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>

      <DevTool control={control} />
    </div>
  )
}
