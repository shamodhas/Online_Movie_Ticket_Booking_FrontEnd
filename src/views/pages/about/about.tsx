const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-white">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
        <p className="text-gray-300">
          At One Movies, our vision is to revolutionize the movie-going
          experience by providing a seamless, efficient, and user-friendly
          online movie ticket booking system. We strive to bring convenience to
          movie enthusiasts by allowing them to book tickets from the comfort of
          their homes or on the go.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
        <p className="text-gray-300">
          One Movies is a cutting-edge online movie ticket booking platform
          designed to simplify and enhance the ticket purchasing process for
          both customers and theaters. Located in the heart of Kurunegala, we
          are dedicated to serving the local community and beyond with a
          state-of-the-art system that meets the needs of modern moviegoers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-300 mb-4">
          Our mission is to offer an unparalleled online booking experience that
          ensures accuracy, security, and convenience. We aim to:
        </p>
        <ul className="list-disc list-inside text-gray-300">
          <li>Provide real-time seat availability and booking options.</li>
          <li>Reduce manual data entry and minimize errors.</li>
          <li>
            Enhance customer satisfaction through a fast and efficient booking
            process.
          </li>
          <li>
            Offer detailed information about movies and theaters to help
            customers make informed choices.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
        <p className="text-gray-300 mb-4">
          We cater to a wide range of users including admins, customers, guests,
          and theater employees. Our platform offers:
        </p>
        <ul className="list-disc list-inside text-gray-300">
          <li>Easy and secure login for all user types.</li>
          <li>Comprehensive movie and theater browsing capabilities.</li>
          <li>Simple and quick booking and cancellation processes.</li>
          <li>Efficient management tools for theater employees and admins.</li>
        </ul>
      </section>
    </div>
  )
}

export default About
