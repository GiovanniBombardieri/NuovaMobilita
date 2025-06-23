import { useAuth, User, Structure } from "../context/AuthContext";

function isStructure(user: User | Structure | null): user is Structure {
  return (user as Structure)?.role === "structure";
}

const ServiceOverview = () => {
  const { user } = useAuth();

  return (
    <div className="h-full w-full">
      <div className="card bg-base-100 w-full h-full shadow-md">
        <div className="card-body flex flex-col items-start text-start">
          {isStructure(user) ? (
            <>
              <h3 className="card-title">
                👋🏼 Welcome to the platform dedicated to post-amputation
                recovery!
              </h3>
              <hr className="my-4 border-t border-gray-300 w-full" />
              <p>
                You have just accessed your reserved space: an environment
                designed to facilitate the encounter between qualified
                structures such as yours and the people who are facing a
                rehabilitation path after an amputation.
                <br />
                <br />
                This platform was born with a clear goal: to connect those who
                need concrete support with realities capable of offering it,
                enhancing skills, services and personalized approaches.
                <br />
                <br />
                We know how important it is to guarantee effective, human and
                tailor -made assistance. For this, here you will find tools to
                best present your structure, receive targeted requests, and
                accompany each patient in the most suitable path to his needs.
              </p>
              <span className="border-l-4 border-gray-500 pl-4 inline-block align-middle mb-10">
                Together, we can make the difference.
              </span>
              <p>
                Update your services, manage requests and actively contribute to
                building a more accessible and conscious health network.
              </p>
            </>
          ) : (
            <>
              <h3 className="card-title">
                👋🏼 Welcome to your space dedicated to restart!
              </h3>
              <hr className="my-4 border-t border-gray-300 w-full" />
              <p>
                <strong>This platform was born with a clear goal:</strong>{" "}
                Becoming the bridge between the people who have experienced an
                amputation and the most suitable health structures to accompany
                them on an effective, human and personalized recovery path.
                <br />
                <br />
                We know how complex it is to orient ourselves in the health
                world after such an impacting event: not all structures are
                prepared to face this type of path, and often lacking
                information, adequate tools or simply the right experience.
                <br />
                <br />
                <strong>
                  Here you only find structures really ready to help you.
                </strong>{" "}
                Orthopedic centers, physiotherapy, hospitals and qualified
                professionals, selected to offer the best skills and services
                for your type of recovery.
              </p>
              <span className="border-l-4 border-gray-500 pl-4 inline-block align-middle mb-10">
                Our goal is to make your path easier, more direct and less
                lonely.
              </span>
              <p>
                Navigate with ease, discover specific performance, contact the
                most suitable centers to you and build your path, step by step.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceOverview;
