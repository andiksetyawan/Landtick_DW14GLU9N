import React from "react";

import { withStyles, Container, Grid, IconButton } from "@material-ui/core";
import Carousel from "nuka-carousel";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";

const styles = theme => ({
  highlight: {
    marginTop: 64,
    backgroundColor: theme.palette.primary.main,
    minHeight: 400,
    padding: "30px 0px 30px 0px",
    color: "#fff",
    fontFamily: "Mandali",
    "& h1": {
      fontSize: 40
    },
    "& div": {
      fontSize: 20
    }
  },
  carousel: {
    "& img": {
      borderRadius: 10,
      height: "100%",
      maxHeight: 250
    }
  }
});

class Highlight extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <section className={classes.highlight}>
        <Container>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <h1>
                <b>Selamat pagi, Ticket Seekers !</b>
              </h1>
              <div>
                Ingin pulkam dengan <b>Good Deal</b> ?
              </div>
              <div>Masuk atau Daftar sekarang.</div>
              {/* <p>Ingin pulkam dengan Good Deal ?</p> */}
            </Grid>
            <Grid item sm={6} xs={12}>
              <div className={classes.carousel}>
                <Carousel
                  autoplay
                  wrapAround
                  swiping
                  transitionMode="scroll3d"
                  renderCenterLeftControls={({ previousSlide }) => (
                    <IconButton
                      color="inherit"
                      aria-label="prev"
                      component="span"
                      onClick={previousSlide}
                    >
                      <ArrowBackIosRoundedIcon />
                    </IconButton>
                  )}
                  renderCenterRightControls={({ nextSlide }) => (
                    <IconButton
                      color="inherit"
                      aria-label="prev"
                      component="span"
                      onClick={nextSlide}
                    >
                      <ArrowForwardIosRoundedIcon />
                    </IconButton>
                  )}
                >
                  <img src="https://tvlk.imgix.net/imageResource/2020/02/15/1581736413932-bbc272cea2d5f5a9e312c51119a063ae.jpeg?auto=compress%2Cformat&cs=srgb&fm=pjpg&ixlib=java-1.1.12&q=75" />
                  <img src="https://ecs7.tokopedia.net/img/blog/promo/2019/11/Feature-Image-940x339-63.jpg" />
                  <img src="https://ecs7.tokopedia.net/img/blog/promo/2020/02/Internal-Featured-Image-940x339.jpg" />
                  {/* <img src="/assets/traiin.jpg" /> */}
                </Carousel>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>
    );
  }
}

export default withStyles(styles)(Highlight);
