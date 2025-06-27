export function validateYoutubeUrl(url: string): boolean {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return pattern.test(url);
}

export function getVideoId(url: string): string {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
}

// New function to validate various social media video URLs
export function validateSocialVideoUrl(url: string): {valid: boolean, platform: string | null} {
    // YouTube (regular and shorts)
    const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    if (youtubePattern.test(url)) {
        // Check if it's a YouTube Short
        if (url.includes('youtube.com/shorts/')) {
            return { valid: true, platform: 'youtube_shorts' };
        }
        return { valid: true, platform: 'youtube' };
    }
    
    // Instagram
    const instagramPattern = /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv)\/([^/?#&]+).*/;
    if (instagramPattern.test(url)) {
        return { valid: true, platform: 'instagram' };
    }
    
    // TikTok
    const tiktokPattern = /^(https?:\/\/)?(www\.)?(tiktok\.com)\/@[^/]+\/video\/\d+.*/;
    if (tiktokPattern.test(url)) {
        return { valid: true, platform: 'tiktok' };
    }
    
    return { valid: false, platform: null };
}

// Get a unique ID from social media URL
export function getSocialVideoId(url: string, platform: string): string {
    if (platform === 'youtube' || platform === 'youtube_shorts') {
        // Extract YouTube video ID
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : '';
    } 
    else if (platform === 'instagram') {
        // Extract Instagram post/reel ID
        const regExp = /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel|tv)\/([^/?#&]+).*/;
        const match = url.match(regExp);
        return match ? match[1] : '';
    } 
    else if (platform === 'tiktok') {
        // Extract TikTok video ID
        const regExp = /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[^/]+\/video\/(\d+).*/;
        const match = url.match(regExp);
        return match ? match[1] : '';
    }
    
    return '';
} 