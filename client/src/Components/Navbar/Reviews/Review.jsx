import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { purple } from "@mui/material/colors";
import { indigo } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import "./Review.css";

const Review = () => {
  return (
    <>
      <hr className="hr"></hr>
      <h5 className="head-text">
        Our Customer <span>Reviews</span>
      </h5>
      <div className="review-card">
        <Card className="card" sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            title=" Rajesh"
            subheader="September 14, 2025"
          />
          <CardMedia
            component="img"
            height="194"
            image={"./images/food_3.png"}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary" className="para">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore
              non amet sequi enim blanditiis cum praesentium ullam consectetur
              cumque! Recusandae error sit hic repudiandae eos quaerat enim
              totam itaque corporis.
            </Typography>
          </CardContent>
        </Card>
        <Card className="card" sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: purple[500] }} aria-label="recipe">
                S
              </Avatar>
            }
            title=" sam"
            subheader="July 10, 2025"
          />
          <CardMedia
            component="img"
            height="194"
            image={"./images/food_7.png"}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary" className="para">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore
              non amet sequi enim blanditiis cum praesentium ullam consectetur
              cumque! Recusandae error sit hic repudiandae eos quaerat enim
              totam itaque corporis.
            </Typography>
          </CardContent>
        </Card>
        <Card className="card" sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: indigo[500] }} aria-label="recipe">
                M
              </Avatar>
            }
            title="mohit"
            subheader="May 15, 2025"
          />
          <CardMedia
            component="img"
            height="194"
            image={"./images/food_31.png"}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary" className="para">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore
              non amet sequi enim blanditiis cum praesentium ullam consectetur
              cumque! Recusandae error sit hic repudiandae eos quaerat enim
              totam itaque corporis.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Review;
