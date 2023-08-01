export default function YoutubeForm() {
  return (
    <div>
      <form>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />

        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" />

        <label htmlFor="channel">Channel</label>
        <input type="text" name="channel" id="channel" />

        <button className="submit-btn" type="submit">Submit</button>
      </form>
    </div>
  )
}
