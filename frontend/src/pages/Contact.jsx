/**
 * @file Contact page component for the application.
 */

// Contact page component.
const Contact = () => {
  return (
    <section>
      <div className="px- mx-auto max-w-screen-md">
        <h2 className="heading text-center "> Contact Us</h2>
        <p className=" text-center mb-5 lg:mb-16  text__para">
          Encountering a tech hiccup or have feedback ? Share your experience.
        </p>
        <form action="" className="space-y-8">
          <div>
            <label htmlFor="email" className="form__label">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="JohnDoe@gmail.com "
              className="form__input mt-1"
            />
          </div>
          <div>
            <label htmlFor="subject" className="form__label">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Let us know your concern."
              className="form__input mt-1 "
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="form__label">
              Your message
            </label>
            <textarea
              type="text"
              id="message"
              cols={16}
              rows={3}
              placeholder="Leave a comment here...."
              className="form__input border border-b-2  mt-1 "
            ></textarea>
          </div>
          <button className="btn rounded-md ms-3 sm:w-fit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
