import { User } from '../../models'

export const updateUserSongs = async (userId: string, songId: string) => {
    try {
      const user = await User.findById(userId);
      const updatedSongs = user.songs.concat([songId]);
      await User.findByIdAndUpdate(
        userId,
        { songs: updatedSongs },
        { new: true }
      );
    } catch (error) {
      throw error
    }
  };