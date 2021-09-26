package com.mangoads.epay;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; 

public class MainActivity extends ReactActivity {
    public static MainActivity sharedMainActivity;
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "EPAY";
  }
   @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        sharedMainActivity = this;
        super.onCreate(savedInstanceState);
    }
}
