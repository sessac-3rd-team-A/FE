import Image from 'next/image';
import '@/styles/error404.scss';
import Link from 'next/link';

export default function Error404() {
  return (
    <div className="error-container">
      <div className="error-doodles">
        <div className="oops-doodles">
          <div className="oops-doodle">
            <Image src="/error404/oops_doodle.svg" alt="oops" fill />
          </div>
          <div className="oops-eyes">
            <div className="oops-eye">
              <Image src="/error404/oops_doodle_eye.svg" alt="oops eye" fill />
            </div>
            <div className="oops-eye">
              <Image src="/error404/oops_doodle_eye.svg" alt="oops eye" fill />
            </div>
          </div>
        </div>
        <div className="oops-tears">
          <div className="oops-tears-left">
            <div className="oops-tear">
              <Image
                src="/error404/oops_doodle_tear.svg"
                alt="oops tear"
                fill
              />
            </div>
          </div>
          <div className="oops-tears-right">
            <div className="oops-tear">
              <Image
                src="/error404/oops_doodle_tear.svg"
                alt="oops tear"
                fill
              />
            </div>
          </div>
        </div>
      </div>
      <div className="oops-text">
        <h1>
          OOPS!
          <br />
          PAGE NOT FOUND
        </h1>
        <Link href={'/'}>
          <button className="oops-btn">GO HOME</button>
        </Link>
      </div>
      <div className="oops-wave">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 1922 194"
          fill="none"
        >
          <path
            d="M0 40.9261C65.3333 10.4261 243.2 -32.2739 432 40.9261C668 132.426 842.5 84.4261 925.5 40.9261C1008.5 -2.57395 1319.5 -29.074 1464.5 54.926C1609.5 138.926 1811 100.426 1870 54.926C1906.98 26.4083 1919.16 16.4887 1921.5 14.2512V13.926C1922.04 13.6012 1922.15 13.6328 1921.5 14.2512V193.926H0V40.9261Z"
            fill="#3A89FF"
          />
        </svg>
        <div
          style={{
            backgroundColor: '#3A89FF',
            width: '100%',
            height: '100%',
            marginTop: '-5%',
          }}
        />
      </div>
    </div>
  );
}
