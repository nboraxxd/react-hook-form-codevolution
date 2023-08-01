import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

interface IYouTubeForm {
  username: string
  email: string
  channel: string
}

export default function YoutubeForm() {
  const { register, control, handleSubmit } = useForm<IYouTubeForm>()

  const onSubmit = (data: IYouTubeForm) => {
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register('username')} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register('email')} />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register('channel')} />

        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>

      <DevTool control={control} />
    </div>
  )
}
