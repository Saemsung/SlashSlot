import React, { useState } from 'react';
import Lateralbar from '../../components/Lateralbar';

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    twoFactorAuth: false,
    language: 'it',
  });

  const handleSettingChange = (setting, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [setting]: value
    }));
  };

  return (
    <div className="settings-page">
      <Lateralbar />
      <div className="settings-content">
        <h1>Impostazioni Account</h1>
        <form>
          <div>
            <label>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
              />
              Ricevi notifiche email
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
              />
              Abilita autenticazione a due fattori
            </label>
          </div>
          <div>
            <label>
              Lingua:
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
              >
                <option value="it">Italiano</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </label>
          </div>
          <button type="submit">Salva Impostazioni</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;