# FFMpegKit for React Native

This project integrates FFMpegKit into a React Native application for video processing tasks. Follow the instructions below to set up the project and make necessary changes for development builds.

## Setup Instructions

1. Install FFMpegKit for React Native following the instructions provided in the [FFMpegKit documentation](https://github.com/tanersener/ffmpeg-kit#react-native).

2. Link the Android and iOS packages using the prebuilt projects. This ensures that the native modules are correctly linked to your React Native project.

3. For development builds, make changes to the build script to ensure the dev build is created. Use the following command:
   ```bash
   eas build --profile development --platform android
   ```

## Additional Notes

- If any additional modules are added to the project, remember to prebuild and make necessary changes to ensure compatibility with FFMpegKit and the React Native project.

- Ensure that you have the necessary permissions and configurations set up in your React Native project for video processing tasks.

## Troubleshooting

- If you encounter any issues during setup or building, refer to the FFMpegKit documentation or the React Native documentation for troubleshooting steps.

s.
