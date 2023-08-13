import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

interface IYouTubeForm {
  username: string
  email: string
  channel: string
  social: {
    twitter: string
    facebook: string
  }
  phoneNumbers: string[]
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
      social: {
        twitter: '',
        facebook: '',
      },
      phoneNumbers: ['', ''],
    },
  })

  const onSubmit = (data: IYouTubeForm) => {
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Username */}
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register('username', { required: 'Username is required' })} />
        <p className="error">{errors.username?.message}</p>
        {/* End Username */}
        {/* Email */}
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
        {/* End Email */}
        {/* Channel */}
        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register('channel', { required: 'Channel is required' })} />
        <p className="error">{errors.channel?.message}</p>
        {/* End Channel */}
        {/* Twitter */}
        <label htmlFor="twitter">Twitter</label>
        <input type="text" id="twitter" {...register('social.twitter')} />
        <p className="error"></p>
        {/* End Twitter */}
        {/* Facebook */}
        <label htmlFor="facebook">Facebook</label>
        <input type="text" id="facebook" {...register('social.facebook')} />
        <p className="error"></p>
        {/* End Facebook */}
        {/* Phone Numbers */}
        <label htmlFor="primary-phone">Primary Phone Numbers</label>
        <input type="text" id="primary-phone" {...register('phoneNumbers.0')} />
        <p className="error"></p>

        <label htmlFor="secondary-phone">Secondary Phone Numbers</label>
        <input type="text" id="secondary-phone" {...register('phoneNumbers.1')} />
        <p className="error"></p>
        {/* End Phone Numbers */}
        {/* Button */}
        <button className="submit-btn" type="submit">
          Submit
        </button>
        {/* End Button */}
      </form>

      <DevTool control={control} />
    </div>
  )
}
