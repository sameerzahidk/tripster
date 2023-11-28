import { Alert } from '@mui/material';
import { useAlertContext } from '@/AlertContext';

const AlertPopup = () => {
  const { text, type, setText, setType } = useAlertContext();

  if (text && type) {
    return (
      <Alert onClose={() => {
        setText('');
        setType('');
      }}
        severity={type}
        color={type}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: 'auto',
          margin: 'auto',
          width: 300,
          top: '50%',
          left:0,
          zIndex: 1400

        }}
      >
        {text}
      </Alert>
    );
  } else {
    return '';
  }
};

export default AlertPopup;