import type { FeaturedSkill, ResumeSkills } from "@/types/resume";
import type {
  Lines,
  ResumeSectionToLines,
} from "@/utils/lib/parse-resume-from-pdf/types";
import { deepClone } from "@/utils/lib/deep-clone";
import { getSectionLinesByKeywords } from "@/utils/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/get-section-lines";
import {
  getBulletPointsFromLines,
  getDescriptionsLineIdx,
} from "@/utils/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/bullet-points";

export const extractSkills = (sections: ResumeSectionToLines) => {
  const lines = getSectionLinesByKeywords(sections, ["skill"]) as Lines;
  const descriptionsLineIdx = getDescriptionsLineIdx(lines) ?? 0;
  const descriptionsLines = lines.slice(descriptionsLineIdx);
  const descriptions = getBulletPointsFromLines(descriptionsLines);

  const skills: ResumeSkills = {
    descriptions,
  };

  return { skills };
};
