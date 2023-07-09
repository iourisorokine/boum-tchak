import { User } from '../../models';

export const updateUserInstruments = async (userId: string, instrumentId: string) => {
    try {
      const user = await User.findById(userId);
      const updatedInstruments = user.customInstruments.concat([instrumentId]);
      await User.findByIdAndUpdate(
        userId,
        { songs: updatedInstruments },
        { new: true }
      );
    } catch (error) {
      throw error
    }
  };