import React, { useState, Fragment } from 'react';
import { HomeSection } from './home.styles';
import SimpleSelect from '../components/dropdown';
import SimpleBackdrop from '../components/loader';
import { TextField, Button } from '@material-ui/core';
import { languageList } from '../config/languages'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { NO_MATCH } from '../config/constants';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  pos: {
    marginBottom: 12,
  },
});

function Home() {
  const [word, setWord] = useState('');
  const [language_code, setLanguage] = useState('');
  const [meaning, setMeaning] = useState<any>('');
  const [loader, setLoader] = useState(false);

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const handleOnChange = (e: any) => {
    setWord(e.target.value)
  }

  const handleSelectChange = () => (e: any) => {
    setLanguage(e.target.value)
  }

  const getMeaning = () => {
    setLoader(true)
    fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/${language_code}/${word}`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/vnd.github.cloak-preview"
        })
      }
    )
      .then(res => {
        return res.status === 200 ? res.json() : NO_MATCH
      })
      .then(response => {
        showMeaning(response)
      })
      .catch(error => {
        showMeaning(NO_MATCH);
      }
      );
  }

  const showMeaning = (response: any) => {
    if (Array.isArray(response)) {
      const { meanings = [] } = response[0];
      const meaningArray = meanings.map((item: any) => item?.definitions[0]?.definition)
      setMeaning(meaningArray)
    }
    else setMeaning(response);
    setLoader(false);

  }

  const clearMeaning = () => {
    setMeaning('');
    setLanguage('');
    setWord('')
  }

  return (
    <HomeSection>
      <div className={'homeDiv'}>
        <Card className={classes.root}>
          <CardContent>
            {!meaning ?
              <Fragment>
                <Typography className={classes.title} color="textSecondary" gutterBottom variant="h2">
                  Type in the word to know its meanings
                </Typography>
                <div className={'cardContent'}>
                  <SimpleSelect selectValue={language_code} handleSelectChange={handleSelectChange()} drpDownData={languageList} />
                  <TextField onChange={e => handleOnChange(e)} variant="outlined" value={word} id={'txtWord'}  autoComplete='off'/>
                  <div>
                    <Button onClick={() => getMeaning()} color={'primary'} variant={'contained'}
                      disabled={!(language_code && word)}>{'Go'}
                    </Button>
                  </div>
                </div>
              </Fragment>
              : <Fragment>
                {!(meaning === NO_MATCH) &&
                  <Typography className={classes.title} color="textSecondary" gutterBottom variant="h2">
                    Here it is.....
                  </Typography>}
                {Array.isArray(meaning) ? <ul>{meaning.map((item => <li>{item}</li>))}</ul> : meaning}
                <div><Button onClick={() => clearMeaning()} variant={'contained'} color={'primary'}>{'Back'}</Button></div>
              </Fragment>}
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
      </div>
      <SimpleBackdrop loader={loader} />
    </HomeSection>
  );
}

export default Home;