import React from 'react';

const Section2 = () => {
    return (
        <>
            <section className="main-container">
        <div className="image-wrapper">
          <div className="column">
            <div className="section">
              <img loading="lazy" srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ad65b377-8689-4c64-9f4b-603a07b28ac5?apiKey=64f3f4c677e745b0a7bf898a230e1c1b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ad65b377-8689-4c64-9f4b-603a07b28ac5?apiKey=64f3f4c677e745b0a7bf898a230e1c1b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ad65b377-8689-4c64-9f4b-603a07b28ac5?apiKey=64f3f4c677e745b0a7bf898a230e1c1b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ad65b377-8689-4c64-9f4b-603a07b28ac5?apiKey=64f3f4c677e745b0a7bf898a230e1c1b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ad65b377-8689-4c64-9f4b-603a07b28ac5?apiKey=64f3f4c677e745b0a7bf898a230e1c1b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ad65b377-8689-4c64-9f4b-603a07b28ac5?apiKey=64f3f4c677e745b0a7bf898a230e1c1b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ad65b377-8689-4c64-9f4b-603a07b28ac5?apiKey=64f3f4c677e745b0a7bf898a230e1c1b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ad65b377-8689-4c64-9f4b-603a07b28ac5?apiKey=64f3f4c677e745b0a7bf898a230e1c1b&"className="image" />
              <div className="title">WOMEN</div>
              <div className="description">COLLECTION</div>
            </div>
          </div>
          <div className="column">
            <div className="section">
              <img loading="lazy" srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/de74e286-c09d-454d-9fc6-1597cf90f1e8?apiKey=64f3f4c677e745b0a7bf898a230e1c1b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/de74e286-c09d-454d-9fc6-1597cf90f1e8?apiKey=64f3f4c677e745b0a7bf898a230e1c1b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/de74e286-c09d-454d-9fc6-1597cf90f1e8?apiKey=64f3f4c677e745b0a7bf898a230e1c1b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/de74e286-c09d-454d-9fc6-1597cf90f1e8?apiKey=64f3f4c677e745b0a7bf898a230e1c1b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/de74e286-c09d-454d-9fc6-1597cf90f1e8?apiKey=64f3f4c677e745b0a7bf898a230e1c1b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/de74e286-c09d-454d-9fc6-1597cf90f1e8?apiKey=64f3f4c677e745b0a7bf898a230e1c1b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/de74e286-c09d-454d-9fc6-1597cf90f1e8?apiKey=64f3f4c677e745b0a7bf898a230e1c1b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/de74e286-c09d-454d-9fc6-1597cf90f1e8?apiKey=64f3f4c677e745b0a7bf898a230e1c1b&"className="image" />
              <div className="title">MEN</div>
              <div className="description">COLLECTION</div>
            </div>
          </div>
        </div>
      </section>
      <style jsx>{`
        .main-container {
          align-self: stretch;
          margin-top: 100px;
          width: 100%;
          padding-right: 4px;
        }
        @media (max-width: 991px) {
          .main-container {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .image-wrapper {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .image-wrapper {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .column {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 50%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .column {
            width: 100%;
          }
        }
        .section {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          display: flex;
          min-height: 570px;
          align-items: end;
          padding: 468px 40px 44px 80px;
        }
        @media (max-width: 991px) {
          .section {
            max-width: 100%;
            margin-top: 40px;
            padding: 100px 20px 0;
          }
        }
        .image {
          position: absolute;
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
        .title {
          position: relative;
          color: #000;
          text-align: right;
          white-space: nowrap;
          font: 400 34px/34px Montserrat, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .title {
            white-space: initial;
          }
        }
        .description {
          position: relative;
          color: #000;
          text-align: right;
          margin-top: 10px;
          font: 400 34px/34px Montserrat, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .column-2 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 50%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-2 {
            width: 100%;
          }
        }
        .section-2 {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          display: flex;
          min-height: 570px;
          align-items: start;
          padding: 468px 80px 44px 40px;
        }
        @media (max-width: 991px) {
          .section-2 {
            max-width: 100%;
            margin-top: 40px;
            padding: 100px 20px 0;
          }
        }
        .title-2 {
          position: relative;
          color: #000;
          white-space: nowrap;
          font: 400 34px/34px Montserrat, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .title-2 {
            white-space: initial;
          }
        }
        .description-2 {
          position: relative;
          color: #000;
          margin-top: 10px;
          font: 400 34px/34px Montserrat, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
      `}</style>
        </>
    );
}

export default Section2;
