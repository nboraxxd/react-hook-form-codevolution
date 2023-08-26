import { useFieldArray, useForm, type FieldErrors } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { useEffect } from 'react'

interface IYouTubeForm {
  username: string
  email: string
  channel: string
  social: {
    twitter: string
    facebook: string
  }
  phoneNumbers: string[]
  phNumbers: {
    number: string
  }[]
  age: number
  dob: Date
}

export default function YoutubeForm() {
  const form = useForm<IYouTubeForm>({
    defaultValues: {
      username: 'Bruce Wayne',
      email: '',
      channel: '',
      social: {
        twitter: '',
        facebook: '',
      },
      phoneNumbers: ['', ''],
      phNumbers: [{ number: '' }],
      age: 0,
      dob: new Date(),
    },
  })

  const { register, control, handleSubmit, formState, watch, getValues, setValue } = form

  const {
    errors,
    // touchedFields,
    // dirtyFields,
    // isDirty
  } = formState
  // console.log('🔥 ~ YoutubeForm ~ touchedFields:', { touchedFields, dirtyFields, isDirty })

  const { fields, append, remove } = useFieldArray({
    name: 'phNumbers',
    control,
  })

  useEffect(() => {
    const subcription = watch((value) => {
      console.log(value)
    })

    return () => subcription.unsubscribe()
  }, [watch])

  const onSubmit = (data: IYouTubeForm) => {
    console.log('🔥 ~ onSubmit ~ data:', data)
  }

  const onError = (errors: FieldErrors<IYouTubeForm>) => {
    console.log('🔥 ~ onError ~ errors:', errors)
  }

  function handleSetValue() {
    setValue('username', '', {
      shouldValidate: true,
      shouldTouch: true,
    })
  }

  function handleGetValues() {
    console.log('Get values', getValues(['username', 'channel']))
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        {/* Username */}
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register('username', { required: 'Username is required' })} disabled />
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
        <input
          type="text"
          id="twitter"
          {...register('social.twitter', {
            disabled: watch('channel') === '',
            required: 'Enter twitter profile',
          })}
        />
        <p className="error">{errors.social?.twitter?.message}</p>
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
        {/* Ph Numbers */}
        <div>
          <label>List of phone numbers</label>
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <input type="text" {...register(`phNumbers.${index}.number` as const)} style={{ marginTop: '12px' }} />
                {index > 0 && (
                  <button type="button" style={{ marginTop: '8px' }} onClick={() => remove(index)}>
                    Remove phone number
                  </button>
                )}
              </div>
            )
          })}
          <button type="button" style={{ marginTop: '20px' }} onClick={() => append({ number: '' })}>
            Add phone number
          </button>
        </div>
        {/* End Ph Numbers */}
        {/* Age */}
        <label htmlFor="age">Age</label>
        <input type="number" id="age" {...register('age', { valueAsNumber: true, required: 'Age is required' })} />
        <p className="error">{errors.age?.message}</p>
        {/* End Age */}
        {/* DOB */}
        <label htmlFor="dob">Date of birth</label>
        <input
          type="date"
          id="dob"
          {...register('dob', { valueAsDate: true, required: 'Date of birth is required' })}
        />
        <p className="error">{errors.dob?.message}</p>
        {/* End DOB */}
        {/* Button */}
        <button className="submit-btn" type="submit">
          Submit
        </button>
        {/* End Button */}
        {/* Get Value */}
        <button className="submit-btn" type="submit" onClick={handleGetValues}>
          Get Value
        </button>
        {/* End Get Value */}
        {/* Set Value */}
        <button className="submit-btn" type="submit" onClick={handleSetValue}>
          Set Value
        </button>
        {/* End Set Value */}
      </form>

      <DevTool control={control} />
    </div>
  )
}
